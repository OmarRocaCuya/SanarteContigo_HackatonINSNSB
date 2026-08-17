# UI/UX — Plataforma de Vinculación Academia-Industria

Sistema de diseño y especificación de pantallas. Referencia visual: mockup "Proyectos recomendados" mostrado en la sesión de trabajo (tarjetas blancas, badges pastel por sector, esquinas muy redondeadas).

---

## 1. Principios de diseño

- **Dinámico:** feedback inmediato y visible — scores de match, badges de estado, notificaciones.
- **Basado en tarjetas:** cada proyecto, necesidad o match es una tarjeta independiente y escaneable, nunca una fila de tabla densa.
- **Esquinas muy redondeadas:** radius grande en tarjetas (16px), pill (999px) en badges y chips.
- **Colores pastel:** paleta suave por categoría/sector — nunca colores saturados o agresivos.
- **Accesible:** todo texto sobre fondo de color usa el tono oscuro de la misma familia (nunca negro puro ni gris genérico).

## 2. Paleta de colores

El color pastel se usa en **badges y chips**, no como fondo completo de la tarjeta — la tarjeta en sí es blanca (o superficie oscura equivalente en modo oscuro), así se mantiene limpia y legible sin perder lo colorido.

| Categoría | Uso sugerido | Fondo (pastel) | Texto |
|---|---|---|---|
| Coral | Alimentos | `#FAECE7` | `#4A1B0C` |
| Rosa | Cosmética / cuidado personal | `#FBEAF0` | `#4B1528` |
| Verde azulado | Agricultura sostenible / agroindustria | `#E1F5EE` | `#04342C` |
| Morado | Empaques / manufactura | `#EEEDFE` | `#26215C` |
| Gris (neutro) | Metadatos, score, estados secundarios | superficie secundaria | texto secundario |

Estados de seguimiento (en la vista del instituto) usan colores semánticos, no pastel decorativo: contactado = gris, en validación = ámbar, piloto = verde azulado, adoptado = verde, descartado = gris oscuro.

## 3. Tipografía y espaciado

- Tipografía: sans-serif del sistema (en producción: Inter o equivalente).
- Título de tarjeta: 15-16px / peso 500.
- Descripción / cuerpo: 13px, color secundario, line-height 1.5.
- Metadatos (score, fecha): 12px, color terciario.
- Padding interno de tarjeta: 16-20px.
- Gap entre tarjetas: 16px.
- Grid responsive: columnas auto-ajustables, mínimo ~200px por tarjeta (3 columnas en desktop, 1 en mobile).

## 4. Componentes clave

### Tarjeta de proyecto / necesidad (componente reutilizable)
- Badge de sector (pill, color pastel por categoría).
- Score de match (texto neutro, esquina superior derecha) — solo aparece cuando la tarjeta viene de una recomendación, no en el catálogo general.
- Título (1 línea, trunca si excede).
- Descripción corta (máx. 2 líneas).
- Botón "Ver ficha →" de ancho completo.

### Ficha de proyecto (vista detalle)
Estructura fija acordada con los directivos:
1. Información general
2. Datos de la innovación (etapa, tecnología, instituto/carrera de origen)
3. Beneficios concretos (lenguaje no técnico, pensado para que lo lea una empresa, no un evaluador académico)
4. Resultados / evidencia
5. Indicadores
6. Botón de contacto directo — fijo y visible siempre (sticky en mobile)
7. *(si aplica)* Tag "busca inversión"
8. *(si el alumno lo activó)* Bloque de perfil/CV del autor

### Dashboard del instituto
- Tarjetas de métrica (n.º proyectos, necesidades, matches activos): fondo gris secundario, número grande (24px/500), etiqueta pequeña arriba.
- Lista de matches con badge de estado (colores semánticos descritos arriba).
- Botón "Generar reporte" destacado, lleva al flujo de evidencia SINEACE.

### Notificaciones (alumno)
- Indicador tipo pill sobre el ícono de campana.
- Tarjeta de notificación con el mismo badge pastel del sector + texto corto ("Nueva necesidad en tu área").

## 5. Pantallas por perfil (mapeo directo a FLUJO.md)

**Empresa**
- Dashboard (proyectos recomendados — ver mockup de referencia)
- Publicar necesidad (wizard de 3 pasos)
- Catálogo general (con filtros de sector/etapa)
- Ficha de proyecto
- Buzón de sugerencias *(P1)*

**Alumno**
- Dashboard
- Registrar proyecto
- Necesidades publicadas por empresas
- Proyectos de la comunidad (otros alumnos)
- Notificaciones

**Instituto**
- Dashboard institucional
- Matches y seguimiento (con cambio de estado)
- Reportes / evidencia (exportable)

## 6. Estado del componente "botón"

Estilo único en toda la plataforma — sin variantes de color por sección, para mantener consistencia: fondo transparente, borde sutil, fondo secundario en hover, ligera reducción de escala al presionar. El color vive en los badges, no en los botones.
