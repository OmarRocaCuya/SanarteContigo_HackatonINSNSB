'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Bell,
  Users,
  BarChart3,
  GitMerge,
  FileText,
  LogOut,
  Building2,
  GraduationCap,
  School,
} from 'lucide-react'

const EMPRESA_NAV = [
  { href: '/empresa/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/empresa/publicar', label: 'Publicar Necesidad', icon: PlusCircle },
  { href: '/empresa/catalogo', label: 'Catálogo de Proyectos', icon: BookOpen },
]

const ALUMNO_NAV = [
  { href: '/alumno/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/alumno/registrar', label: 'Registrar Proyecto', icon: PlusCircle },
  { href: '/alumno/necesidades', label: 'Necesidades de Empresas', icon: Building2 },
  { href: '/alumno/comunidad', label: 'Proyectos Comunidad', icon: Users },
  { href: '/alumno/notificaciones', label: 'Notificaciones', icon: Bell },
]

const INSTITUTO_NAV = [
  { href: '/instituto/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/instituto/matches', label: 'Matches & Seguimiento', icon: GitMerge },
  { href: '/instituto/reportes', label: 'Reportes de Evidencia', icon: FileText },
]

const ROLE_CONFIG = {
  empresa: {
    nav: EMPRESA_NAV,
    icon: Building2,
    color: '#FAECE7',
    textColor: '#4A1B0C',
  },
  alumno: {
    nav: ALUMNO_NAV,
    icon: GraduationCap,
    color: '#E1F5EE',
    textColor: '#04342C',
  },
  instituto: {
    nav: INSTITUTO_NAV,
    icon: School,
    color: '#EEEDFE',
    textColor: '#26215C',
  },
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  if (!user) return null

  const config = ROLE_CONFIG[user.role]
  const nav = config.nav
  const RoleIcon = config.icon

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-100 flex flex-col z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
            <GitMerge size={16} className="text-white" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">VinculaPeru</span>
        </Link>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ backgroundColor: config.color }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: config.textColor }}
          >
            <RoleIcon size={14} className="text-white" />
          </div>
          <div className="min-w-0">
            <p
              className="text-xs font-semibold truncate"
              style={{ color: config.textColor }}
            >
              {user.name}
            </p>
            <p className="text-xs opacity-70 truncate" style={{ color: config.textColor }}>
              {user.companyName ?? user.institute ?? user.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
