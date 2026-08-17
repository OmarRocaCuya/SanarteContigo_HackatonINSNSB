# Propuesta de solución — Desafío "Sanarte: emociones que sanan"
### Visión global de la solución (pre-selección de MVP)

---

## 1. Resumen del problema

El personal asistencial y administrativo del INSN-SB presenta una prevalencia plena de burnout de 12,6% y 16,5% respectivamente, con cerca del 50% del personal mostrando al menos un síntoma (ventana de prevención subclínica). Sanarte ya ofrece una oferta de bienestar valiosa, pero el problema central es de **accesibilidad**: turnos rotativos, agotamiento post-guardia y estigma dificultan que el personal llegue a esa oferta de forma constante y oportuna.

La solución no reemplaza a Sanarte ni a los servicios clínicos existentes: **lleva el bienestar al tiempo y al contexto real del trabajador**, y le da a Salud Ocupacional una capa de datos agregados que hoy no existe para diseñar intervenciones basadas en evidencia.

---

## 2. Arquitectura general de la solución

Dos componentes conectados por un mismo backend, pero con **audiencias, permisos y tipos de datos completamente separados**:

| Componente | Usuario | Tipo de datos que maneja |
|---|---|---|
| **App móvil "Sanarte Contigo"** *(nombre tentativo)* | Personal asistencial y administrativo | Datos de uso, gamificación y bienestar — visibles solo al propio usuario y de forma agregada al equipo |
| **Panel "Sanarte · Salud Ocupacional"** *(nombre tentativo)* | Equipo de Salud Ocupacional exclusivamente | Datos individuales de seguimiento (Likert) + indicadores agregados por servicio |

Esta separación es el principio de diseño más importante de toda la propuesta: **el dato social/gamificado nunca se mezcla con el dato clínico/sensible**, y ninguno de los dos es visible para jefaturas de línea.

---

## 3. Componente 1 — App móvil para el trabajador

### 3.1 Onboarding
- Registro de horario laboral (turno, servicio/área, categoría asistencial o administrativo).
- Consentimientos informados, separados y revocables en cualquier momento:
  1. Consentimiento base de uso de la app (gamificación, notificaciones).
  2. Consentimiento específico y opcional para compartir resultados del cuestionario Likert con Salud Ocupacional.
- Sin captura de rol jerárquico visible en la interfaz de equipo (evita que la propia app distinga "jefe" de "colaborador" en las vistas sociales).

### 3.2 Pausas activas adaptativas
- Al inicio, la app programa pausas en horarios estándar según el horario declarado.
- El sistema observa en qué momentos el usuario efectivamente realiza las pausas y reajusta la programación siguiente. Para el diseño completo (no solo el MVP) esto se plantea como una **heurística de reglas simples** (ej. "si las últimas N pausas se completaron X minutos después de lo sugerido, desplazar el horario sugerido"), no como un modelo de machine learning — mantiene bajo costo, es explicable y es defendible en viabilidad técnica.
- Videos guía cortos (1–3 min), producidos internamente por el equipo de Sanarte (sin costos de licencia), con opción de descarga para verlos sin conexión en zonas del hospital con mala señal.
- Posponer una pausa nunca resta puntos ni genera penalización — solo refuerzo positivo por completarlas, para no reforzar el estigma de "interrumpir la labor".

### 3.3 Semáforo emocional
- Check-in emocional breve durante la jornada (recomendación de diseño: 5–6 emojis representando estados amplios, en vez de una escala de colores sola o un set muy granular — más rápido de responder en medio de un turno y suficientemente expresivo).
- Según la respuesta, la app sugiere una microintervención (ej. frustración → ejercicio breve de respiración o técnica STOP; alegría → invitación opcional a enviar un mensaje de reconocimiento a un compañero de equipo).
- El mensaje de reconocimiento entre compañeros queda identificado (no anónimo, para que se sienta genuino), con un filtro automático de contenido inapropiado y un botón de reporte revisado por el equipo de coordinación de Sanarte ya existente (sin necesidad de contratar personal nuevo).
- **Manejo de datos del semáforo:** el estado emocional puntual del usuario no se envía identificado a Salud Ocupacional. Solo alimenta:
  - Puntos de gamificación por el hecho de completar el check-in (no por el contenido).
  - Una tendencia agregada y anónima por servicio (ej. "% de check-ins con emoción negativa esta semana en el servicio X"), visible únicamente en el panel de Salud Ocupacional.
  - Si un mismo usuario reporta patrones sostenidos de malestar, la app lo invita **de forma privada y opcional** a completar el cuestionario Likert o a buscar apoyo — nunca lo reporta automáticamente a un tercero.

### 3.4 Talleres Sanarte
- Calendario de próximos talleres con duración, frecuencia, fechas, horarios y cupos.
- Inscripción desde la app.
- Asistencia confirmada otorga puntos (mismo principio: puntos por participación, no por ningún dato sensible).

### 3.5 Cuestionario Likert de seguimiento
- Estandarizado, de aplicación periódica, **estrictamente voluntario** y sujeto al consentimiento específico descrito en el onboarding.
- Otorga puntos por completarlo, independientemente del resultado.
- El puntaje obtenido **no es visible para el usuario mismo en términos clínicos ni para su equipo** — solo se refleja como "completado ✓" a nivel de gamificación.
- El resultado real llega únicamente al panel de Salud Ocupacional (ver componente 2).
- El usuario puede revocar el consentimiento y solicitar la eliminación de sus respuestas en cualquier momento (derecho ARCO, Ley 29733).

### 3.6 Gamificación y equipos
- Equipos organizados por servicio hospitalario o área administrativa, en dos categorías separadas: **asistencial** y **administrativo** (dinámicas laborales distintas, premiación separada).
- **Cálculo del puntaje: promedio per cápita**, no puntaje total — para que un servicio con más personal no tenga ventaja estructural sobre uno más pequeño.
- **Umbral mínimo de participación** para que un equipo entre al ranking (ej. al menos 60–70% de su nómina registrada y activa), evitando que equipos pequeños inflen su promedio con 2–3 personas muy comprometidas.
- Metas semanales individuales y grupales.
- Reconocimiento semanal al mejor equipo asistencial y al mejor equipo administrativo: **certificado simbólico dentro de la app** ("Reconocimiento Sanarte"), sin ningún componente salarial, contractual ni de evaluación de desempeño. Difusión opcional en el boletín Sanarte existente (ej. "el equipo A lleva 3 semanas consecutivas como el más activo").
- **Regla de privacidad no negociable dentro del equipo:** ningún miembro (jefe o colaborador) ve el desglose individual de aportes de sus compañeros — todos ven el puntaje agregado del equipo y únicamente su propio aporte individual. Esto resuelve tanto la vigilancia jerárquica externa como la presión entre pares (estigma horizontal).
- *(Línea de evolución futura, no para el prototipo inicial)*: categorías por tamaño de servicio (brackets) y ponderación de puntos según dificultad de adherencia del servicio (ej. turno rotativo vs. horario fijo), para una equidad más fina que el promedio per cápita.

---

## 4. Componente 2 — Plataforma para Salud Ocupacional

Este es el componente que actualmente falta en la propuesta original y que responde directamente al Insight 5 (la dimensión organizacional, no solo individual) y a la exigencia del desafío de articularse con las líneas de teleorientación y el CSMC.

### 4.1 Acceso y gobernanza de datos
- Acceso restringido exclusivamente al personal de Salud Ocupacional, con registro de auditoría (quién consultó qué dato y cuándo).
- Separación funcional y de sistemas respecto a RR.HH. y jefaturas de servicio — el dato de salud del trabajador no debe ser accesible desde ningún canal administrativo o de evaluación de desempeño.
- Registro/gestión de consentimientos: quién ha aceptado compartir su Likert, quién lo ha revocado, historial de cambios.

### 4.2 Vista individual (para fines de derivación)
- Resultado del cuestionario Likert por trabajador, disponible solo para quien tiene consentimiento activo.
- Permite a Salud Ocupacional identificar y derivar oportunamente a CSMC, EsSalud o clínica según seguro, cerrando el ciclo que hoy no existe entre "detectar" y "derivar".
- Módulo simple de seguimiento de derivación (caso abierto → derivado → en seguimiento → cerrado), sin almacenar detalle clínico dentro de la app — solo el estado del proceso.

### 4.3 Vista agregada por servicio (para diseño de intervenciones)
- Indicadores por servicio: tasa de adopción de la app, adherencia a pausas activas, asistencia a talleres, tendencia de resultados Likert, tendencia de emociones reportadas en el semáforo (agregada y anónima).
- Comparación temporal (¿mejoró o empeoró un servicio tras una intervención?).
- Umbral mínimo de N personas antes de mostrar cualquier cifra desagregada por servicio, para preservar anonimato incluso en la vista agregada.
- Exportación de reportes para cumplir con los indicadores de adopción, bienestar y clima laboral que el propio desafío pide medir.

### 4.4 Límites explícitos de la plataforma
- No diagnostica ni sustituye la evaluación clínica — únicamente organiza y prioriza información para que un profesional humano tome la decisión de derivación.
- No es una herramienta de evaluación de desempeño laboral y no debe integrarse con ningún sistema que lo sea.

---

## 5. Cumplimiento normativo (a declarar explícitamente en la presentación)

- **Ley N.º 29733** (Protección de Datos Personales): consentimiento informado y específico, derechos ARCO, minimización de datos, separación de datos sensibles.
- **Ley N.º 30947** (Salud Mental) y normativa de Seguridad y Salud en el Trabajo: base para que Salud Ocupacional maneje datos de salud del trabajador bajo reserva profesional, separado del canal administrativo.
- Sin recolección de datos sensibles identificables sin consentimiento explícito y revocable.

---

## 6. Sostenibilidad y bajo costo

- Contenido (videos de pausas, preguntas del Likert, textos de microintervenciones) producido y curado por el propio equipo de Sanarte — sin licencias externas.
- Moderación de mensajería social apoyada en filtros automáticos + revisión por el equipo de coordinación de Sanarte ya existente — sin contratación adicional.
- Arquitectura pensada para stack de bajo costo/open source, compatible con la infraestructura de TI del instituto (a validar en fase de factibilidad técnica con el área de TI).

---

## 7. Indicadores de éxito propuestos

- Tasa de adopción de la app por servicio (asistencial vs. administrativo).
- Adherencia a pausas activas programadas.
- Tasa de participación voluntaria en el Likert.
- Asistencia a talleres Sanarte originada desde la app.
- Tendencia de resultados Likert por servicio a lo largo del tiempo.
- Tiempo entre detección de señal de riesgo y derivación efectiva (indicador clave para Salud Ocupacional).

---

## 8. Fases de evolución (visión completa → selección de MVP)

**Fase 1 — Núcleo funcional:** onboarding, pausas activas con videos, semáforo emocional básico, calendario e inscripción a talleres.

**Fase 2 — Capa social y de seguimiento:** gamificación por equipos (per cápita + umbral de participación), reconocimientos simbólicos, cuestionario Likert con consentimiento, panel básico de Salud Ocupacional (vista individual + agregada).

**Fase 3 — Refinamiento de equidad y analítica:** brackets por tamaño de servicio, ponderación por dificultad de adherencia, módulo de seguimiento de derivación, reportes exportables para indicadores institucionales.

---

*Esta es la visión completa de la solución. La siguiente etapa de trabajo consiste en seleccionar, dentro de esta visión, el subconjunto mínimo que se puede demostrar como prototipo funcional en el tiempo disponible de la hackatón.*
