# BACKEND — Plataforma de Vinculación Academia-Industria

Implementación a nivel de servicio sobre lo definido en el TRD. Pensado para Supabase (Postgres + Auth + Edge Functions) + Next.js API routes, listo para "vibe coding".

---

## 1. Estructura de carpetas

```
/backend
  /supabase
    /migrations
      0001_init_schema.sql
      0002_rls_policies.sql
    /functions
      matching-engine/index.ts
      send-notification/index.ts
      generate-report/index.ts
  /lib
    claude.ts         # cliente Claude API
    embeddings.ts      # generación de embeddings
    matching.ts        # lógica de scoring y orquestación
    validation.ts       # esquemas de validación (zod)
  /app/api
    proyectos/route.ts
    necesidades/route.ts
    matches/route.ts
    instituto/dashboard/route.ts
    instituto/reporte/route.ts
    sugerencias/route.ts
.env.local
```

## 2. Variables de entorno

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` y `ANTHROPIC_API_KEY` solo se usan en server-side (Edge Functions / API routes) — nunca en el cliente.

## 3. Esquema de base de datos (SQL)

```sql
create extension if not exists vector;

create type rol_usuario as enum ('empresa', 'alumno', 'instituto');
create type etapa_proyecto as enum ('idea', 'prototipo', 'validado');
create type tipo_apoyo as enum ('piloto', 'conocimiento', 'mano_obra');
create type estado_match as enum ('contactado', 'en_validacion', 'piloto', 'adoptado', 'descartado');

create table institutos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  ubicacion text,
  contacto_email text,
  contacto_telefono text,
  creado_en timestamptz default now()
);

create table usuarios (
  id uuid primary key references auth.users(id),
  rol rol_usuario not null,
  nombre text not null,
  email text unique not null,
  creado_en timestamptz default now()
);

create table empresas (
  usuario_id uuid primary key references usuarios(id) on delete cascade,
  razon_social text not null,
  rubro text[] not null,
  ubicacion text,
  tamano text,
  descripcion text
);

create table alumnos (
  usuario_id uuid primary key references usuarios(id) on delete cascade,
  instituto_id uuid references institutos(id),
  carrera text,
  cv_url text,
  cv_visible boolean default false
);

create table directivos (
  usuario_id uuid primary key references usuarios(id) on delete cascade,
  instituto_id uuid references institutos(id),
  cargo text
);

create table proyectos (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid references alumnos(usuario_id) not null,
  instituto_id uuid references institutos(id) not null,
  titulo text not null,
  sector text not null,
  problema_resuelve text not null,
  etapa etapa_proyecto not null default 'idea',
  beneficios_concretos text,
  resultados_evidencia text,
  indicadores jsonb,
  busca_inversion boolean default false,
  estado_publicacion text default 'aprobado',
  embedding vector(1536),
  creado_en timestamptz default now()
);

create table necesidades (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references empresas(usuario_id) not null,
  categoria text not null,
  descripcion text not null,
  tipo_apoyo tipo_apoyo not null,
  embedding vector(1536),
  creado_en timestamptz default now()
);

create table matches (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid references proyectos(id) not null,
  necesidad_id uuid references necesidades(id),
  empresa_id uuid references empresas(usuario_id) not null,
  score numeric(5,2) not null,
  justificacion text,
  estado estado_match not null default 'contactado',
  actualizado_en timestamptz default now(),
  creado_en timestamptz default now()
);

create table notificaciones (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid references alumnos(usuario_id) not null,
  necesidad_id uuid references necesidades(id),
  leido boolean default false,
  creado_en timestamptz default now()
);

create table sugerencias (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references empresas(usuario_id) not null,
  instituto_id uuid references institutos(id) not null,
  texto text not null,
  convertida_en_necesidad boolean default false,
  creado_en timestamptz default now()
);

create index on proyectos using ivfflat (embedding vector_cosine_ops);
create index on necesidades using ivfflat (embedding vector_cosine_ops);
```

## 4. Row Level Security (RLS)

```sql
alter table proyectos enable row level security;
alter table necesidades enable row level security;
alter table matches enable row level security;

-- Proyectos: lectura pública, escritura solo del autor o el instituto al que pertenece
create policy "proyectos_select_all" on proyectos for select using (true);
create policy "proyectos_insert_alumno" on proyectos for insert with check (alumno_id = auth.uid());
create policy "proyectos_update_autor_o_instituto" on proyectos for update using (
  alumno_id = auth.uid()
  or instituto_id in (select instituto_id from directivos where usuario_id = auth.uid())
);

-- Necesidades: lectura pública, escritura solo de la empresa autora
create policy "necesidades_select_all" on necesidades for select using (true);
create policy "necesidades_insert_empresa" on necesidades for insert with check (empresa_id = auth.uid());

-- Matches: visibles solo para las partes involucradas y el instituto correspondiente
create policy "matches_select_partes" on matches for select using (
  empresa_id = auth.uid()
  or proyecto_id in (select id from proyectos where alumno_id = auth.uid())
  or proyecto_id in (
    select id from proyectos where instituto_id in (
      select instituto_id from directivos where usuario_id = auth.uid()
    )
  )
);
create policy "matches_update_instituto" on matches for update using (
  proyecto_id in (
    select id from proyectos where instituto_id in (
      select instituto_id from directivos where usuario_id = auth.uid()
    )
  )
);
```

## 5. Lógica de servicios por endpoint

**POST /proyectos** (alumno crea un proyecto)
1. Validar payload (título, sector, problema_resuelve obligatorios).
2. Insertar fila en `proyectos`.
3. Generar embedding del texto combinado (título + problema_resuelve + sector) y guardarlo.
4. Disparar `matching-engine` de forma asíncrona con `{ origenTipo: 'proyecto', origenId }`.

**POST /necesidades** (empresa publica una necesidad)
1. Validar payload (categoría, descripción, tipo_apoyo obligatorios).
2. Insertar fila en `necesidades`.
3. Generar embedding y guardarlo.
4. Disparar `matching-engine` con `{ origenTipo: 'necesidad', origenId }`.

**PATCH /matches/:id** (instituto actualiza estado)
1. Verificar que el usuario autenticado es directivo del instituto dueño del proyecto (lo cubre la RLS, pero también se valida en la capa de servicio).
2. Actualizar `estado` y `actualizado_en`.

**GET /instituto/reporte?desde&hasta**
1. Query de `matches` filtrando por rango de fechas y `instituto_id` del directivo autenticado.
2. Agregar conteos: total de proyectos, necesidades, matches por estado.
3. Generar archivo (PDF/Excel) con esos datos y devolver URL de descarga.

## 6. Motor de matching — `matching-engine` (Edge Function)

```
function ejecutarMatching(origenTipo, origenId):
  origen = obtenerProyectoONecesidad(origenTipo, origenId)
  candidatos = buscarSimilares(origen.embedding, tablaOpuesta(origenTipo), top=5)

  para cada candidato en candidatos:
    prompt = construirPromptScoring(origen, candidato)
    respuestaIA = llamarClaude(prompt)   // { score, justificacion }
    guardarMatch(origen, candidato, respuestaIA.score, respuestaIA.justificacion)

    si respuestaIA.score > UMBRAL_NOTIFICACION:
      dispararNotificacion(candidato)
```

**Prompt de scoring (Claude API, respuesta estructurada en JSON):**

```
Eres un evaluador de compatibilidad entre proyectos de innovación estudiantil
y necesidades empresariales.

Proyecto: {titulo} — {problema_resuelve} (sector: {sector})
Necesidad: {descripcion} (categoría: {categoria}, tipo de apoyo: {tipo_apoyo})

Devuelve solo un JSON con:
- score: número de 0 a 100 indicando qué tan bien el proyecto podría resolver la necesidad
- justificacion: 2-3 líneas en lenguaje claro, pensado para que lo lea una empresa no técnica

Responde solo con el JSON, sin texto adicional.
```

`UMBRAL_NOTIFICACION` queda como constante configurable (sugerido: 70) — definir el valor final con datos reales de la demo.

## 7. Manejo de errores y validación

- Todas las respuestas de error siguen el formato `{ "error": { "code": "...", "message": "..." } }`.
- Validación de payloads con un esquema (`zod` o equivalente) antes de tocar la base de datos — rechazar con `400` si falla.
- Errores de la llamada a Claude (timeout, rate limit) no deben tumbar la creación del proyecto/necesidad: el registro se guarda igual, y el matching se reintenta o queda en estado `pendiente`.

## 8. Checklist de implementación (orden sugerido)

1. Levantar Supabase y correr las migraciones (esquema + RLS).
2. Configurar Auth con la tabla `usuarios` y sus roles.
3. Implementar CRUD básico de `proyectos` y `necesidades`.
4. Implementar generación de embeddings + función `matching-engine`.
5. Conectar las pantallas ya especificadas en UI/UX a estos endpoints.
6. Implementar dashboard del instituto y el reporte exportable.
7. Cargar datos semilla reales del Instituto Pacarán para la demo.
