'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { UserRole } from '@/lib/types'

interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  companyName?: string
  institute?: string
  program?: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('vincula_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {}
    }
    setIsLoading(false)
  }, [])

  const login = (u: AuthUser) => {
    setUser(u)
    localStorage.setItem('vincula_user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vincula_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export const DEMO_USERS: AuthUser[] = [
  {
    id: 'e1',
    name: 'Juan Ramírez',
    email: 'juan@cooperativacañete.com',
    role: 'empresa',
    companyName: 'Cooperativa Agraria Valle Cañete',
  },
  {
    id: 'a1',
    name: 'Carlos Quispe Mamani',
    email: 'carlos.quispe@iestp-pacaran.edu.pe',
    role: 'alumno',
    institute: 'IESTP Pacarán',
    program: 'Computación e Informática',
  },
  {
    id: 'd1',
    name: 'Ing. Rosa Vargas León',
    email: 'r.vargas@iestp-pacaran.edu.pe',
    role: 'instituto',
    institute: 'IESTP Pacarán',
  },
]
