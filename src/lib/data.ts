import type { Proyecto, Necesidad, Match, Notificacion, Sugerencia } from './types'

export const PROYECTOS: Proyecto[] = [
  {
    id: 'p1',
    title: 'Sistema de Riego Tecnificado con Monitoreo IoT',
    sector: 'Agricultura / Alimentario',
    problem:
      'Los agricultores del valle de Cañete pierden hasta un 40% del agua de riego por sistemas deficientes, afectando la rentabilidad de cultivos de espárrago y maíz.',
    stage: 'validado',
    benefits:
      'Reducción del consumo de agua en un 35%, aumento de rendimiento por hectárea en 20% y ahorro estimado de S/ 800/mes por agricultor.',
    results:
      'Piloto ejecutado en 2 hectáreas de espárragos en Quilmaná. Sensores de humedad instalados, sistema de alertas por SMS funcional.',
    indicators: 'Ahorro de agua: 35% | ROI: 8 meses | Cobertura: 2 Ha piloto',
    seekingInvestment: true,
    authorId: 'a1',
    authorName: 'Carlos Quispe Mamani',
    authorProgram: 'Computación e Informática',
    institute: 'IESTP Pacarán',
    createdAt: '2026-03-15',
  },
  {
    id: 'p2',
    title: 'Bioplástico de Almidón de Yuca para Empaque Agrícola',
    sector: 'Envases / Manufactura',
    problem:
      'Los empaques de plástico convencional usados en exportaciones de frutas del valle generan 2.3 toneladas de residuos mensuales y no son aceptados por mercados europeos.',
    stage: 'prototipo',
    benefits:
      'Empaque 100% biodegradable, compatible con estándares de exportación UE, costo de producción 15% menor al plástico convencional.',
    results:
      'Prototipo de film bioplástico producido en laboratorio. Pruebas de resistencia realizadas con maracuyá y mango.',
    indicators:
      'Biodegradación: 60 días | Resistencia: 85% del PET estándar | Costo: S/ 0.08/unidad',
    seekingInvestment: false,
    authorId: 'a2',
    authorName: 'María Santos Ríos',
    authorProgram: 'Industrias Alimentarias',
    institute: 'IESTP Pacarán',
    createdAt: '2026-03-20',
  },
  {
    id: 'p3',
    title: 'Conservante Natural de Saúco para Alimentos Artesanales',
    sector: 'Cosméticos / Cuidado Personal',
    problem:
      'Los productores artesanales de la región usan conservantes químicos (benzoato de sodio) que reducen el valor comercial de sus productos en mercados orgánicos.',
    stage: 'prototipo',
    benefits:
      'Conservante 100% natural, amplía vida útil de mermeladas y salsas hasta 6 meses, aumenta precio de venta en mercados ecológicos en un 25%.',
    results:
      'Extracto liofilizado obtenido de saúco andino (Sambucus peruviana). Pruebas antimicrobianas en laboratorio de la institución.',
    indicators: 'Vida útil: +180 días | Inhibición bacteriana: 94% | Concentración efectiva: 0.3%',
    seekingInvestment: false,
    authorId: 'a3',
    authorName: 'Luis Flores Ccoa',
    authorProgram: 'Industrias Alimentarias',
    institute: 'IESTP Pacarán',
    createdAt: '2026-04-01',
  },
  {
    id: 'p4',
    title: 'App de Trazabilidad para Productores de Maracuyá',
    sector: 'Tecnología / Digital',
    problem:
      'Los exportadores de maracuyá no pueden demostrar trazabilidad completa a compradores internacionales, perdiendo contratos con supermercados de Europa y EE.UU.',
    stage: 'validado',
    benefits:
      'Trazabilidad completa desde parcela hasta exportación, QR escaneable por compradores internacionales, cumple con estándares GlobalGAP.',
    results:
      'App Android funcional, probada con 12 productores de Quilmaná. Integración con SENASA en proceso.',
    indicators:
      'Productores activos: 12 | Lotes trazados: 47 | Tiempo registro: 3 min/lote',
    seekingInvestment: true,
    authorId: 'a4',
    authorName: 'Ana Torres Palomino',
    authorProgram: 'Computación e Informática',
    institute: 'IESTP Pacarán',
    createdAt: '2026-02-10',
  },
  {
    id: 'p5',
    title: 'Biofertilizante de Residuos Orgánicos del Valle de Cañete',
    sector: 'Agricultura Sostenible / Agroindustria',
    problem:
      'Los residuos de cosecha (bagazo de caña, hojas de maíz) son quemados generando contaminación, cuando podrían convertirse en biofertilizante para los mismos agricultores.',
    stage: 'idea',
    benefits:
      'Reducción de costos en fertilizantes químicos en 30%, gestión circular de residuos, mejora de estructura del suelo a largo plazo.',
    results:
      'Revisión bibliográfica completa. Formulación propuesta con inoculación de Azotobacter vinelandii. Pendiente prueba piloto.',
    indicators: 'Reducción de fertilizante: 30% | Costo de producción estimado: S/ 2/kg',
    seekingInvestment: false,
    authorId: 'a5',
    authorName: 'Pedro Huanca Condori',
    authorProgram: 'Agropecuaria',
    institute: 'IESTP Pacarán',
    createdAt: '2026-04-10',
  },
]

export const NECESIDADES: Necesidad[] = [
  {
    id: 'n1',
    title: 'Reducir consumo de agua en cultivos de espárrago',
    sector: 'Agricultura / Alimentario',
    description:
      'Nuestra cooperativa maneja 120 hectáreas de espárrago blanco en el valle de Cañete. Necesitamos una solución tecnológica o agronómica que nos permita reducir el consumo de agua entre un 20-40% sin afectar el rendimiento, de cara a las restricciones hídricas proyectadas para 2027.',
    supportType: 'piloto',
    companyId: 'e1',
    companyName: 'Cooperativa Agraria Valle Cañete',
    companyLocation: 'San Vicente de Cañete',
    createdAt: '2026-04-05',
  },
  {
    id: 'n2',
    title: 'Empaque biodegradable certificado para exportación de frutas',
    sector: 'Envases / Manufactura',
    description:
      'Exportamos maracuyá y mango a supermercados en Alemania y Países Bajos. A partir de 2027, la regulación EU Packaging Regulation exige empaques biodegradables. Buscamos un proveedor o solución local que pueda escalar a 50,000 unidades/mes.',
    supportType: 'conocimiento',
    companyId: 'e2',
    companyName: 'Frutales Exportaciones SAC',
    companyLocation: 'Cañete',
    createdAt: '2026-04-08',
  },
  {
    id: 'n3',
    title: 'Alternativa natural a conservantes químicos en mermeladas',
    sector: 'Cosméticos / Cuidado Personal',
    description:
      'Producimos 800 kg mensuales de mermeladas y salsas artesanales para el mercado orgánico. El uso de benzoato de sodio nos impide acceder a tiendas especializadas y plataformas de comercio justo. Necesitamos un conservante natural efectivo y de bajo costo.',
    supportType: 'mano_de_obra',
    companyId: 'e3',
    companyName: 'Alimentos Naturales del Perú EIRL',
    companyLocation: 'Lunahuaná',
    createdAt: '2026-04-12',
  },
]

export const MATCHES: Match[] = [
  {
    id: 'm1',
    projectId: 'p1',
    projectTitle: 'Sistema de Riego Tecnificado con Monitoreo IoT',
    needId: 'n1',
    needTitle: 'Reducir consumo de agua en cultivos de espárrago',
    companyName: 'Cooperativa Agraria Valle Cañete',
    studentName: 'Carlos Quispe Mamani',
    score: 87,
    justification:
      'El sistema IoT de riego del proyecto aborda directamente la necesidad de eficiencia hídrica de la cooperativa. El piloto validado en 2 Ha de espárrago es prueba de concepto directa. Alta compatibilidad técnica y contextual.',
    state: 'en_validacion',
    createdAt: '2026-04-06',
    stateHistory: [
      { state: 'contactado', date: '2026-04-06' },
      { state: 'en_validacion', date: '2026-04-09' },
    ],
  },
  {
    id: 'm2',
    projectId: 'p2',
    projectTitle: 'Bioplástico de Almidón de Yuca para Empaque Agrícola',
    needId: 'n2',
    needTitle: 'Empaque biodegradable certificado para exportación de frutas',
    companyName: 'Frutales Exportaciones SAC',
    studentName: 'María Santos Ríos',
    score: 92,
    justification:
      'El bioplástico de yuca responde exactamente a la regulación EU Packaging que menciona la empresa. Las pruebas con maracuyá y mango son el mismo producto que exportan. Score máximo por coincidencia de producto, destino y normativa.',
    state: 'piloto',
    createdAt: '2026-04-09',
    stateHistory: [
      { state: 'contactado', date: '2026-04-09' },
      { state: 'en_validacion', date: '2026-04-11' },
      { state: 'piloto', date: '2026-04-16' },
    ],
  },
  {
    id: 'm3',
    projectId: 'p3',
    projectTitle: 'Conservante Natural de Saúco para Alimentos Artesanales',
    needId: 'n3',
    needTitle: 'Alternativa natural a conservantes químicos en mermeladas',
    companyName: 'Alimentos Naturales del Perú EIRL',
    studentName: 'Luis Flores Ccoa',
    score: 91,
    justification:
      'Coincidencia directa: el extracto de saúco es el conservante natural que busca la empresa, aplicado exactamente al tipo de producto (mermeladas y salsas). La eficacia de 94% en pruebas antimicrobianas es robusta.',
    state: 'contactado',
    createdAt: '2026-04-13',
    stateHistory: [{ state: 'contactado', date: '2026-04-13' }],
  },
]

export const NOTIFICACIONES: Notificacion[] = [
  {
    id: 'not1',
    userId: 'a1',
    message: 'Cooperativa Agraria Valle Cañete publicó una necesidad en tu sector',
    sector: 'Agricultura / Alimentario',
    needId: 'n1',
    needTitle: 'Reducir consumo de agua en cultivos de espárrago',
    companyName: 'Cooperativa Agraria Valle Cañete',
    read: false,
    createdAt: '2026-04-05',
  },
  {
    id: 'not2',
    userId: 'a2',
    message: 'Frutales Exportaciones SAC publicó una necesidad en tu sector',
    sector: 'Envases / Manufactura',
    needId: 'n2',
    needTitle: 'Empaque biodegradable certificado para exportación de frutas',
    companyName: 'Frutales Exportaciones SAC',
    read: true,
    createdAt: '2026-04-08',
  },
]

export const SUGERENCIAS: Sugerencia[] = [
  {
    id: 's1',
    companyName: 'Cooperativa Agraria Valle Cañete',
    text: '¿Podrían los alumnos desarrollar más proyectos relacionados con fertilización orgánica? Es una necesidad creciente en el valle.',
    createdAt: '2026-04-07',
  },
]

export const SECTOR_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Agricultura / Alimentario': {
    bg: '#FAECE7',
    text: '#4A1B0C',
    border: '#F4C5B0',
  },
  'Cosméticos / Cuidado Personal': {
    bg: '#FBEAF0',
    text: '#4B1528',
    border: '#F2BDD0',
  },
  'Agricultura Sostenible / Agroindustria': {
    bg: '#E1F5EE',
    text: '#04342C',
    border: '#A7E3CE',
  },
  'Envases / Manufactura': {
    bg: '#EEEDFE',
    text: '#26215C',
    border: '#C7C4F8',
  },
  'Tecnología / Digital': {
    bg: '#E0F2FE',
    text: '#0C4A6E',
    border: '#BAE6FD',
  },
  Salud: {
    bg: '#FEF3C7',
    text: '#78350F',
    border: '#FDE68A',
  },
}

export const MATCH_STATE_CONFIG: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  contactado: { label: 'Contactado', bg: '#E5E7EB', text: '#374151' },
  en_validacion: { label: 'En validación', bg: '#FEF3C7', text: '#78350F' },
  piloto: { label: 'Piloto', bg: '#CCFBF1', text: '#0F766E' },
  adoptado: { label: 'Adoptado', bg: '#BBF7D0', text: '#166534' },
  descartado: { label: 'Descartado', bg: '#F3F4F6', text: '#6B7280' },
}

export const STAGE_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  idea: { label: 'Idea', bg: '#F3F4F6', text: '#374151' },
  prototipo: { label: 'Prototipo', bg: '#FEF3C7', text: '#78350F' },
  validado: { label: 'Validado', bg: '#BBF7D0', text: '#166534' },
}

export const SUPPORT_TYPE_LABEL: Record<string, string> = {
  piloto: 'Piloto técnico',
  conocimiento: 'Conocimiento',
  mano_de_obra: 'Mano de obra técnica',
}
