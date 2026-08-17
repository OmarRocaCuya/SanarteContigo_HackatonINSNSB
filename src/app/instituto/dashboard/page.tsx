'use client'

import { useAuth } from '@/contexts/AuthContext'
import { PROYECTOS, NECESIDADES, MATCHES, MATCH_STATE_CONFIG } from '@/lib/data'
import { MatchStateBadge, SectorBadge } from '@/components/ui/Badge'
import { BarChart3, GitMerge, BookOpen, Building2, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'

export default function InstitutoDashboard() {
  const { user } = useAuth()

  const metrics = [
    {
      label: 'Proyectos registrados',
      value: PROYECTOS.length,
      icon: BookOpen,
      color: '#E1F5EE',
      tc: '#04342C',
    },
    {
      label: 'Necesidades de empresas',
      value: NECESIDADES.length,
      icon: Building2,
      color: '#FAECE7',
      tc: '#4A1B0C',
    },
    {
      label: 'Matches activos',
      value: MATCHES.filter((m) => m.state !== 'descartado').length,
      icon: GitMerge,
      color: '#EEEDFE',
      tc: '#26215C',
    },
    {
      label: 'En piloto / Adoptados',
      value: MATCHES.filter((m) => m.state === 'piloto' || m.state === 'adoptado').length,
      icon: BarChart3,
      color: '#BBF7D0',
      tc: '#166534',
    },
  ]

  const stateStats = Object.entries(MATCH_STATE_CONFIG).map(([key, config]) => ({
    ...config,
    key,
    count: MATCHES.filter((m) => m.state === key).length,
  }))

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Dashboard institucional
          </h1>
          <p className="text-gray-500 text-sm">
            {user?.institute} · Vinculación academia-industria
          </p>
        </div>
        <Link href="/instituto/reportes" className="btn-primary text-sm">
          <Download size={14} />
          Generar reporte
        </Link>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map(({ label, value, icon: Icon, color, tc }) => (
          <div key={label} className="card text-center" style={{ borderTop: `3px solid ${tc}20` }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: color }}
            >
              <Icon size={18} style={{ color: tc }} />
            </div>
            <p className="text-3xl font-bold" style={{ color: tc }}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Match funnel */}
      <div className="card mb-8">
        <h2 className="font-semibold text-gray-900 mb-5">Embudo de vinculación</h2>
        <div className="flex gap-2">
          {stateStats.map(({ key, label, count, bg, text }) => (
            <div key={key} className="flex-1 text-center">
              <div
                className="h-16 rounded-xl flex items-end justify-center pb-2 font-bold text-xl transition-all"
                style={{
                  backgroundColor: bg,
                  color: text,
                  opacity: count === 0 ? 0.4 : 1,
                  minHeight: count === 0 ? '24px' : undefined,
                  height: count === 0 ? '24px' : `${Math.max(24, count * 40)}px`,
                }}
              >
                {count > 0 && count}
              </div>
              <p className="text-xs text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent matches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Matches recientes</h2>
          <Link href="/instituto/matches" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
            Ver todos <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-3">
          {MATCHES.slice(0, 3).map((match) => (
            <div key={match.id} className="card flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <MatchStateBadge state={match.state} />
                  <span className="text-xs text-gray-400">{match.score}% compatibilidad</span>
                </div>
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{match.projectTitle}</p>
                <p className="text-xs text-gray-500">
                  {match.studentName} → {match.companyName}
                </p>
              </div>
              <div className="text-xs text-gray-400 flex-shrink-0">{match.createdAt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sector breakdown */}
      <div className="mt-8 card">
        <h2 className="font-semibold text-gray-900 mb-4">Proyectos por sector</h2>
        <div className="space-y-3">
          {[...new Set(PROYECTOS.map((p) => p.sector))].map((sector) => {
            const count = PROYECTOS.filter((p) => p.sector === sector).length
            return (
              <div key={sector} className="flex items-center gap-3">
                <SectorBadge sector={sector} />
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gray-400 transition-all"
                    style={{ width: `${(count / PROYECTOS.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-4">{count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
