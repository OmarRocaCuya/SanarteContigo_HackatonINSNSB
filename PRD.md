# PRD — Plataforma de Vinculación Academia-Industria

**Versión:** 1.0 (Hackathon AIdea)
**Caso piloto:** Instituto de Educación Superior Tecnológico Público de Pacarán (Cañete)

---

## 1. Problem Statement

Los Institutos de Educación Superior del Perú no logran conectar los proyectos de innovación de sus estudiantes con las empresas de su región: los proyectos se desarrollan sin validación ni participación del sector productivo, y esto impide al instituto evidenciar ante CONEACES y SINEACE la vinculación con el medio e I+D+i que exige su modelo de acreditación.

- **Quién lo sufre:** estudiantes (proyectos sin salida real), institutos (no pueden acreditar vinculación), empresas (sin acceso visible a innovación de bajo riesgo).
- **Escala:** se replica en los más de 900 institutos tecnológicos del país; solo el 23% logró licenciamiento del Minedu entre 2018 y 2025.
- **Caso motivador:** identificado de primera mano en el Instituto Pacarán (Cañete), cuya visión institucional busca "contribuir al desarrollo productivo y empresarial de su localidad" — hoy sin un sistema que lo permita.
- **Indicador base:** 0 proyectos con seguimiento o adopción documentada por una empresa en los últimos [X] años *(a confirmar con el instituto)*.

## 2. Goals

1. **(Alumno)** Dar a los proyectos de innovación estudiantil un canal real de validación y posible adopción por empresas — meta: al menos 1 proyecto con seguimiento documentado durante el piloto (vs. 0 actual).
2. **(Empresa)** Reducir la fricción para acceder a innovación aplicada y talento técnico de la región — meta: menos de 48h entre publicar una necesidad y recibir los primeros matches relevantes.
3. **(Instituto)** Generar evidencia trazable de vinculación con el medio productivo y seguimiento a egresados, lista para reportar ante CONEACES/SINEACE — meta: dashboard exportable con al menos 3 indicadores ligados a los Estándares 12, 20 y 34.
4. **(Validación del modelo)** Confirmar que el matching es deseable para los 3 perfiles antes de invertir en una versión productiva — meta: 5-10 entrevistas/pruebas con empresas reales de Cañete durante el hackathon.

## 3. Non-Goals (v1)

- **No** se construye un sistema completo de matching de inversión (due diligence, transacciones). Solo un tag "busca inversión" en la ficha — es un dominio distinto y demasiado complejo para v1.
- **No** se integra directamente con los sistemas oficiales de SINEACE/CONEACES (no hay API pública conocida) — el output es un reporte/dashboard exportable que el instituto sube manualmente.
- **No** se construye app móvil nativa — solo web responsive.
- **No** se soporta multi-instituto en v1 — el piloto se limita al Instituto Pacarán, antes de generalizar a la red nacional.
- **No** se procesan pagos ni transacciones entre empresa e instituto/estudiante — fuera del problema validado.

## 4. User Stories

### Empresa
- Como empresa, quiero registrar mi perfil y rubro para que la plataforma me recomiende proyectos relevantes sin tener que buscarlos.
- Como empresa, quiero publicar una necesidad en un formulario corto para que estudiantes e instituto la vean sin fricción.
- Como empresa, quiero ver una ficha completa de cada proyecto (información general, beneficios concretos, datos de innovación, resultados, indicadores) para decidir rápido si me interesa.
- Como empresa, quiero explorar un catálogo general de proyectos ya desarrollados, no solo los recomendados, para no depender únicamente del algoritmo.
- Como empresa, quiero ver los datos y CV del estudiante autor de un proyecto (si él lo hizo público) para evaluar si quiero contratarlo o seguir colaborando.
- Como empresa, quiero dejar una sugerencia o idea suelta sin formalizarla como necesidad completa, para bajar la barrera de participar.
- Como empresa, quiero un canal de contacto directo (correo o número del instituto) para resolver dudas generales.

### Alumno
- Como alumno, quiero registrar mi proyecto de innovación para que sea visible a empresas e instituto.
- Como alumno, quiero ver las necesidades publicadas por empresas para orientar el tema de mi próximo proyecto hacia un problema real.
- Como alumno, quiero recibir una alerta cuando una empresa publica una necesidad relacionada a mi sector, sin tener que revisar la plataforma constantemente.
- Como alumno, quiero ver los proyectos de otros estudiantes (incluyendo de generaciones anteriores) para no duplicar esfuerzos y poder dar continuidad a un proyecto existente.

### Instituto (directivo)
- Como directivo, quiero ver todos los proyectos, necesidades y matches generados en un solo lugar, para tener visibilidad total del proceso de vinculación.
- Como directivo, quiero hacer seguimiento al estado de cada match (contactado → en validación → piloto → adoptado/descartado).
- Como directivo, quiero generar un reporte/dashboard exportable con evidencia de vinculación y seguimiento a egresados, para usarlo en mi proceso de acreditación.
- *(P1)* Como directivo, quiero validar/aprobar un proyecto o necesidad antes de que sea visible públicamente, para mantener la calidad de la información.

## 5. Requirements

### P0 — Must-have (MVP del hackathon)

| Requisito | Criterio de aceptación |
|---|---|
| Registro de perfil (3 roles) | Dado un usuario nuevo, cuando se registra, entonces elige su rol (empresa/alumno/instituto) y completa los campos básicos |
| Registro de proyecto (alumno) | Dado un alumno autenticado, cuando registra un proyecto, entonces queda visible en el catálogo con título, sector, problema que resuelve y etapa |
| Registro de necesidad (empresa) | Dado una empresa autenticada, cuando publica una necesidad en el formulario corto, entonces queda visible para alumnos e instituto |
| Motor de matching con IA | Dado un proyecto o necesidad publicada, cuando se ejecuta el matching, entonces el sistema retorna candidatos con score de compatibilidad y justificación en lenguaje natural |
| Ficha de proyecto | Dado un proyecto publicado, cuando se visualiza su detalle, entonces muestra información general, datos de innovación, beneficios concretos, resultados/evidencia e indicadores |
| Catálogo general explorable | Dado un usuario empresa, cuando entra al catálogo, entonces puede filtrar proyectos por sector y etapa sin depender de una recomendación |
| Dashboard del instituto | Dado un directivo autenticado, cuando entra al dashboard, entonces ve el total de proyectos, necesidades y matches activos |
| Alertas de oportunidad (alumno) | Dado un alumno con sector/carrera definido, cuando se publica una necesidad relacionada, entonces recibe una notificación |

### P1 — Nice-to-have (si alcanza el tiempo)
- Seguimiento de estado del match (contactado → piloto → adoptado/descartado)
- Visibilidad opcional del CV del alumno (opt-in)
- Buzón de sugerencias para empresas (visible solo al instituto)
- Validación/aprobación de proyectos por parte del instituto antes de publicarse

### P2 — Future considerations (roadmap, no se construye ahora)
- Reporte exportable automático para CONEACES/SINEACE
- Recomendador proactivo de temas de tesis según necesidades recurrentes
- Sección de oportunidades de inversión con flujo completo
- Soporte multi-instituto (expansión a la red nacional de 900+ institutos)
- App móvil nativa

## 6. Success Metrics

**Leading (durante el hackathon / corto plazo):**
- N.º de proyectos registrados en la plataforma
- N.º de necesidades publicadas por empresas
- N.º de matches generados con score "alto" (umbral a definir)
- Tiempo promedio entre publicar necesidad y recibir el primer match

**Lagging (post-hackathon / mediano plazo):**
- N.º de proyectos con seguimiento documentado por una empresa (línea base: 0)
- N.º de matches que avanzan a piloto o adopción real
- N.º de indicadores de acreditación (SINEACE/CONEACES) respaldables directamente con datos de la plataforma

## 7. Open Questions

- ¿Cuántos años/proyectos cubre el indicador base "0 proyectos con seguimiento"? *(directivos — bloqueante para fijar la línea base real)*
- ¿Qué empresas específicas de Cañete se pueden contactar para validar el lado de demanda durante el hackathon? *(equipo/directivos — bloqueante para validación)*
- ¿El instituto tiene un repositorio digital de proyectos de tesis, o se parte de cero? *(instituto — no bloqueante, afecta el alcance de la carga inicial de datos)*
- ¿Qué nivel de consentimiento legal se requiere para mostrar el CV de un estudiante a una empresa externa? *(legal/instituto — no bloqueante para el hackathon, sí para producción)*

## 8. Timeline Considerations

- **Fase 0 (Hackathon):** construir y demostrar el flujo P0 con datos semilla (proyectos reales de Pacarán + necesidades simuladas o validadas con alguna empresa de Cañete).
- **Fase 1 (post-hackathon):** cerrar P1, validar con el Instituto Pacarán como piloto real durante un ciclo académico.
- **Fase 2:** evaluar expansión a otros institutos de Lima Provincias y construir el módulo de reporte automático para SINEACE.
