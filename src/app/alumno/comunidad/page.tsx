'use client'

import { useState } from 'react'
import { PROYECTOS } from '@/lib/data'
import { SectorBadge, StageBadge } from '@/components/ui/Badge'
import { Search, DollarSign, Users } from 'lucide-react'
import type { Sector } from '@/lib/types'

export default function ComunidadPage() {
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState<Sector | ''>('')

  const filtered = PROYECTOS.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.authorName.toLowerCase().includes(search.toLowerCase()) ||
      p.problem.toLowerCase().includes(search.toLowerCase())
    const matchSector = !sector || p.sector === sector
    return matchSearch && matchSector
  })

  const sectors = [...new Set(PROYECTOS.map((p) => p.sector))]

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Proyectos de la comunidad</h1>
        <p className="text-gray-500 text-sm">
          {PROYECTOS.length} proyectos de alumnos del IESTP Pacarán — promociones 2025-2026
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Proyectos validados', value: PROYECTOS.filter(p => p.stage === 'validado').length, color: '#BBF7D0', tc: '#166534' },
          { label: 'En desarrollo', value: PROYECTOS.filter(p => p.stage === 'prototipo').length, color: '#FEF3C7', tc: '#78350F' },
          { label: 'Buscan inversión', value: PROYECTOS.filter(p => p.seekingInvestment).length, color: '#FEF9C3', tc: '#713F12' },
        ].map(({ label, value, color, tc }) => (
          <div key={label} className="card text-center">
            <p className="text-3xl font-bold mb-1" style={{ color: tc }}>{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="input pl-9"
            placeholder="Buscar proyectos o alumnos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="select w-auto min-w-[180px]"
          value={sector}
          onChange={(e) => setSector(e.target.value as Sector | '')}
        >
          <option value="">Todos los sectores</option>
          {sectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p>Sin proyectos para tu búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div key={project.id} className="card flex flex-col gap-4 hover:shadow-md transition-shadow">
              {/* Badges */}
              <div className="flex items-start justify-between gap-2">
                <SectorBadge sector={project.sector} />
                <StageBadge stage={project.stage} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-[15px] leading-snug line-clamp-2 mb-1">
                  {project.title}
                </h3>
                <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Investment tag */}
              {project.seekingInvestment && (
                <span className="badge w-fit" style={{ backgroundColor: '#FEF9C3', color: '#713F12' }}>
                  <DollarSign size={10} className="mr-1" />
                  Busca inversión
                </span>
              )}

              {/* Author */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-700">{project.authorName}</p>
                <p className="text-xs text-gray-400">{project.authorProgram} · {project.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
