'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { GitMerge, Building2, GraduationCap, School, Check } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import type { UserRole } from '@/lib/types'

const ROLES = [
  {
    value: 'empresa',
    label: 'Empresa',
    description: 'Publica necesidades y encuentra proyectos',
    icon: Building2,
    color: '#FAECE7',
    tc: '#4A1B0C',
  },
  {
    value: 'alumno',
    label: 'Alumno',
    description: 'Registra tu proyecto de innovación',
    icon: GraduationCap,
    color: '#E1F5EE',
    tc: '#04342C',
  },
  {
    value: 'instituto',
    label: 'Instituto',
    description: 'Gestiona vinculación y acreditación',
    icon: School,
    color: '#EEEDFE',
    tc: '#26215C',
  },
]

const DESTINATIONS: Record<UserRole, string> = {
  empresa: '/empresa/dashboard',
  alumno: '/alumno/dashboard',
  instituto: '/instituto/dashboard',
}

function RegistroForm() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole | ''>((searchParams.get('role') as UserRole) ?? '')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    location: '',
    institute: '',
    program: '',
    position: '',
  })

  const { login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const r = searchParams.get('role') as UserRole
    if (r) setRole(r)
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) return

    const userId = `user_${Date.now()}`
    const user = {
      id: userId,
      name: form.name,
      email: form.email,
      role: role as UserRole,
      companyName: role === 'empresa' ? form.companyName : undefined,
      institute: role !== 'empresa' ? form.institute : undefined,
      program: role === 'alumno' ? form.program : undefined,
    }

    login(user)
    router.push(DESTINATIONS[role as UserRole])
  }

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
            <GitMerge size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900">VinculaPeru</span>
        </Link>

        <div className="card">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    step > s
                      ? 'bg-gray-900 text-white'
                      : step === s
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step > s ? <Check size={12} /> : s}
                </div>
                {s < 2 && <div className={`flex-1 h-px ${step > s ? 'bg-gray-900' : 'bg-gray-200'}`} style={{ width: 40 }} />}
              </div>
            ))}
            <span className="text-xs text-gray-400 ml-2">
              {step === 1 ? 'Selecciona tu rol' : 'Datos de registro'}
            </span>
          </div>

          {/* Step 1: Role selection */}
          {step === 1 && (
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">¿Quién eres?</h1>
              <p className="text-sm text-gray-500 mb-6">Selecciona tu rol en la plataforma</p>
              <div className="space-y-3">
                {ROLES.map(({ value, label, description, icon: Icon, color, tc }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setRole(value as UserRole)
                      setStep(2)
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      role === value ? 'border-gray-900' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      <Icon size={20} style={{ color: tc }} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{label}</p>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>
                    {role === value && <Check size={16} className="ml-auto text-gray-900" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && role && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">Datos de registro</h1>
                <p className="text-sm text-gray-500 mb-4">
                  Completa tu perfil como{' '}
                  <span className="font-medium text-gray-900">
                    {ROLES.find((r) => r.value === role)?.label}
                  </span>
                </p>
              </div>

              <div>
                <label className="label">Nombre completo</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Tu nombre completo"
                  required
                  value={form.name}
                  onChange={set('name')}
                />
              </div>

              <div>
                <label className="label">Correo electrónico</label>
                <input
                  type="email"
                  className="input"
                  placeholder="correo@ejemplo.com"
                  required
                  value={form.email}
                  onChange={set('email')}
                />
              </div>

              <div>
                <label className="label">Contraseña</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Mínimo 8 caracteres"
                  minLength={8}
                  required
                  value={form.password}
                  onChange={set('password')}
                />
              </div>

              {role === 'empresa' && (
                <>
                  <div>
                    <label className="label">Nombre de la empresa</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Mi Empresa SAC"
                      required
                      value={form.companyName}
                      onChange={set('companyName')}
                    />
                  </div>
                  <div>
                    <label className="label">Ubicación</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Cañete, Lima"
                      value={form.location}
                      onChange={set('location')}
                    />
                  </div>
                </>
              )}

              {role === 'alumno' && (
                <>
                  <div>
                    <label className="label">Instituto</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="IESTP Pacarán"
                      required
                      value={form.institute}
                      onChange={set('institute')}
                    />
                  </div>
                  <div>
                    <label className="label">Carrera</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Computación e Informática"
                      required
                      value={form.program}
                      onChange={set('program')}
                    />
                  </div>
                </>
              )}

              {role === 'instituto' && (
                <>
                  <div>
                    <label className="label">Instituto</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="IESTP Pacarán"
                      required
                      value={form.institute}
                      onChange={set('institute')}
                    />
                  </div>
                  <div>
                    <label className="label">Cargo</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Director / Jefe de Área"
                      value={form.position}
                      onChange={set('position')}
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn flex-1"
                >
                  Atrás
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Crear cuenta
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="font-medium text-gray-900 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default function RegistroPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <RegistroForm />
    </Suspense>
  )
}
