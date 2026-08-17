export type UserRole = 'empresa' | 'alumno' | 'instituto'

export type Sector =
  | 'Agricultura / Alimentario'
  | 'Cosméticos / Cuidado Personal'
  | 'Agricultura Sostenible / Agroindustria'
  | 'Envases / Manufactura'
  | 'Tecnología / Digital'
  | 'Salud'

export type ProjectStage = 'idea' | 'prototipo' | 'validado'

export type SupportType = 'piloto' | 'conocimiento' | 'mano_de_obra'

export type MatchState =
  | 'contactado'
  | 'en_validacion'
  | 'piloto'
  | 'adoptado'
  | 'descartado'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Empresa extends User {
  role: 'empresa'
  companyName: string
  industry: Sector[]
  location: string
  size: string
  description: string
}

export interface Alumno extends User {
  role: 'alumno'
  institute: string
  program: string
  cohort: string
  cvVisible: boolean
}

export interface Directivo extends User {
  role: 'instituto'
  institute: string
  position: string
}

export interface Proyecto {
  id: string
  title: string
  sector: Sector
  problem: string
  stage: ProjectStage
  benefits: string
  results: string
  indicators: string
  seekingInvestment: boolean
  authorId: string
  authorName: string
  authorProgram: string
  institute: string
  createdAt: string
  embedding?: number[]
}

export interface Necesidad {
  id: string
  title: string
  sector: Sector
  description: string
  supportType: SupportType
  companyId: string
  companyName: string
  companyLocation: string
  createdAt: string
  embedding?: number[]
}

export interface Match {
  id: string
  projectId: string
  projectTitle: string
  needId: string
  needTitle: string
  companyName: string
  studentName: string
  score: number
  justification: string
  state: MatchState
  createdAt: string
  stateHistory: { state: MatchState; date: string }[]
}

export interface Notificacion {
  id: string
  userId: string
  message: string
  sector: Sector
  needId: string
  needTitle: string
  companyName: string
  read: boolean
  createdAt: string
}

export interface Sugerencia {
  id: string
  companyName: string
  text: string
  createdAt: string
}
