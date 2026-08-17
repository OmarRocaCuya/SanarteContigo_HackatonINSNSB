'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GitMerge } from 'lucide-react'
import { useAuth, DEMO_USERS } from '@/contexts/AuthContext'

const ROLE_DESTINATIONS = {
  empresa: '/empresa/dashboard',
  alumno: '/alumno/dashboard',
  instituto: '/instituto/dashboard',
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = DEMO_USERS.find((u) => u.email === email)
    if (!user) {
      setError('Usuario no encontrado. Usa una cuenta demo.')
      return
    }
    login(user)
    router.push(ROLE_DESTINATIONS[user.role])
  }

  const enterDemo = (role: 'empresa' | 'alumno' | 'instituto') => {
    const user = DEMO_USERS.find((u) => u.role === role)!
    login(user)
    router.push(ROLE_DESTINATIONS[role])
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
            <GitMerge size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900">VinculaPeru</span>
        </Link>

        <div className="card">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Iniciar sesión</h1>
          <p className="text-sm text-gray-500 mb-6">
            Ingresa con tu cuenta o usa una demo
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Correo electrónico</label>
              <input
                type="email"
                className="input"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Contraseña</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full">
              Ingresar
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">o ingresa en modo demo</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Demo buttons */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: 'empresa', label: 'Empresa', color: '#FAECE7', tc: '#4A1B0C' },
              { role: 'alumno', label: 'Alumno', color: '#E1F5EE', tc: '#04342C' },
              { role: 'instituto', label: 'Instituto', color: '#EEEDFE', tc: '#26215C' },
            ].map(({ role, label, color, tc }) => (
              <button
                key={role}
                onClick={() => enterDemo(role as 'empresa' | 'alumno' | 'instituto')}
                className="py-2 px-3 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={{ backgroundColor: color, color: tc }}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/registro" className="font-medium text-gray-900 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
