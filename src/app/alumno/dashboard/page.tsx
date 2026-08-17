'use client'

import { useAuth } from '@/contexts/AuthContext'
import { PROYECTOS, MATCHES, NOTIFICACIONES, NECESIDADES } from '@/lib/data'
import { SectorBadge, StageBadge, MatchStateBadge } from '@/components/ui/Badge'
import { Bell, PlusCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AlumnoDashboard() {
  const { user } = useAuth()

  const myProjects = PROYECTOS.filter((p) => p.authorId === user?.id)
  const unreadNotifs = NOTIFICACIONES.filter((n) => n.userId === user?.id && !n.read)
  const myMatches = MATCHES.filter((m) =>
    myProjects.some((p) => p.id === m.projectId)
  )
  const recentNeeds = NECESIDADES.slice(0, 2)

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hola, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            {user?.program} · {user?.institute}
          </p>
        </div>
        {unreadNotifs.length > 0 && (
          <Link href="/alumno/notificaciones" className="relative btn">
            <Bell size={16} />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              {unreadNotifs.length}
            </span>
            Notificaciones
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Mis proyectos', value: myProjects.length, color: '#E1F5EE', tc: '#04342C' },
          { label: 'Matches activos', value: myMatches.length, color: '#EEEDFE', tc: '#26215C' },
          { label: 'Alertas nuevas', value: unreadNotifs.length, color: '#FEF3C7', tc: '#78350F' },
        ].map(({ label, value, color, tc }) => (
          <div key={label} className="card text-center">
            <p className="text-3xl font-bold mb-1" style={{ color: tc }}>
              {value}
            </p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* My projects */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Mis proyectos</h2>
          <Link href="/alumno/registrar" className="btn text-sm">
            <PlusCircle size={14} />
            Nuevo proyecto
          </Link>
        </div>

        {myProjects.length === 0 ? (
          <div className="card text-center py-10">
            <p className="text-gray-400 mb-3">Aún no tienes proyectos registrados</p>
            <Link href="/alumno/registrar" className="btn-primary">
              Registra tu primer proyecto
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myProjects.map((p) => {
              const pMatch = myMatches.find((m) => m.projectId === p.id)
              return (
                <div key={p.id} className="card">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <SectorBadge sector={p.sector} />
                        <StageBadge stage={p.stage} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{p.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{p.problem}</p>
                    </div>
                    {pMatch && (
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-400 mb-1">Match</p>
                        <MatchStateBadge state={pMatch.state} />
                        <p className="text-xs text-gray-500 mt-1">{pMatch.companyName}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Recent needs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Necesidades recientes de empresas</h2>
          <Link href="/alumno/necesidades" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
            Ver todas <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentNeeds.map((n) => (
            <div key={n.id} className="card flex items-center gap-4">
              <SectorBadge sector={n.sector} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{n.title}</p>
                <p className="text-xs text-gray-500">{n.companyName}</p>
              </div>
              <Link href="/alumno/necesidades" className="btn text-xs flex-shrink-0">
                Ver →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
