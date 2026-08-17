'use client'

import Link from 'next/link'
import { GitMerge, Building2, GraduationCap, School, ArrowRight, Zap } from 'lucide-react'
import { useAuth, DEMO_USERS } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

const ROLE_CARDS = [
  {
    role: 'empresa',
    icon: Building2,
    title: 'Soy una Empresa',
    description:
      'Publica tus necesidades técnicas y encuentra proyectos de innovación estudiantil que resuelvan tus retos reales.',
    color: '#FAECE7',
    textColor: '#4A1B0C',
    href: '/auth/registro?role=empresa',
    benefits: ['Acceso a talento técnico regional', 'Proyectos validados en laboratorio', 'Contacto directo con institutos'],
  },
  {
    role: 'alumno',
    icon: GraduationCap,
    title: 'Soy Alumno',
    description:
      'Registra tu proyecto de innovación y conéctalo con empresas de la región que necesitan exactamente lo que desarrollaste.',
    color: '#E1F5EE',
    textColor: '#04342C',
    href: '/auth/registro?role=alumno',
    benefits: ['Validación real de tu proyecto', 'Visibilidad ante empresas', 'Alertas de oportunidades'],
  },
  {
    role: 'instituto',
    icon: School,
    title: 'Soy del Instituto',
    description:
      'Gestiona la vinculación academia-industria de tu institución y genera evidencia trazable para acreditación SINEACE.',
    color: '#EEEDFE',
    textColor: '#26215C',
    href: '/auth/registro?role=instituto',
    benefits: ['Dashboard de vinculación', 'Seguimiento de matches', 'Reportes para CONEACES'],
  },
]

const DEMO_ROLE_MAP = {
  empresa: '/empresa/dashboard',
  alumno: '/alumno/dashboard',
  instituto: '/instituto/dashboard',
}

export default function LandingPage() {
  const { login } = useAuth()
  const router = useRouter()

  const enterDemo = (roleKey: 'empresa' | 'alumno' | 'instituto') => {
    const user = DEMO_USERS.find((u) => u.role === roleKey)
    if (user) {
      login(user)
      router.push(DEMO_ROLE_MAP[roleKey])
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <GitMerge size={16} className="text-white" />
            </div>
            <span className="font-semibold text-gray-900">VinculaPeru</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn text-sm">
              Iniciar sesión
            </Link>
            <Link href="/auth/registro" className="btn-primary text-sm">
              Registrarse
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 badge bg-gray-100 text-gray-600 mb-6">
            <Zap size={12} />
            <span>Piloto — Instituto Pacarán, Cañete</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Conecta la innovación estudiantil
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
              con la industria regional
            </span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Los proyectos de innovación de los institutos técnicos resuelven problemas reales.
            VinculaPeru conecta a estudiantes con empresas y genera evidencia trazable
            para la acreditación institucional.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 mb-12">
            {[
              { value: '5', label: 'Proyectos registrados' },
              { value: '3', label: 'Necesidades activas' },
              { value: '3', label: 'Matches generados' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-3">¿Quién eres?</h2>
          <p className="text-center text-gray-500 mb-10">
            Accede a la plataforma según tu rol
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLE_CARDS.map(
              ({ role, icon: Icon, title, description, color, textColor, href, benefits }) => (
                <div
                  key={role}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
                >
                  {/* Card header */}
                  <div
                    className="px-6 py-6 flex items-center gap-3"
                    style={{ backgroundColor: color }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: textColor }}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg" style={{ color: textColor }}>
                      {title}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
                      {description}
                    </p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-xs text-gray-600">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Link href={href} className="btn-primary w-full text-center text-sm">
                        Registrarse <ArrowRight size={14} />
                      </Link>
                      <button
                        onClick={() => enterDemo(role as 'empresa' | 'alumno' | 'instituto')}
                        className="btn w-full text-sm"
                        style={{ borderColor: color, color: textColor, backgroundColor: color }}
                      >
                        Demo — Entrar como {title.replace('Soy ', '')}
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-3">
            ¿Cómo funciona?
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Matching semántico con IA en 3 pasos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Registra',
                desc: 'Alumnos publican proyectos. Empresas publican sus necesidades técnicas.',
                color: '#FAECE7',
              },
              {
                step: '02',
                title: 'Conecta',
                desc: 'El algoritmo de IA calcula compatibilidad semántica y genera un score con justificación.',
                color: '#E1F5EE',
              },
              {
                step: '03',
                title: 'Colabora',
                desc: 'El instituto hace seguimiento del match desde contacto hasta adopción del proyecto.',
                color: '#EEEDFE',
              },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: color }}
                >
                  <span className="text-lg font-bold text-gray-700">{step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center">
              <GitMerge size={12} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">VinculaPeru</span>
          </div>
          <p className="text-xs text-gray-400">
            Piloto — Instituto Pacarán · Cañete, Perú · 2026
          </p>
        </div>
      </footer>
    </main>
  )
}
