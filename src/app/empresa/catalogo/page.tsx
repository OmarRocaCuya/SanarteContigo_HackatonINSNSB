'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { PROYECTOS } from '@/lib/data'
import type { Sector, ProjectStage } from '@/lib/types'

const SECTORS: Sector[] = [
  'Agricultura / Alimentario',
  'Cosméticos / Cuidado Personal',
  'Agricultura Sostenible / Agroindustria',
  'Envases / Manufactura',
  'Tecnología / Digital',
  'Salud',
]

const STAGES: { value: ProjectStage; label: string }[] = [
  { value: 'idea', label: 'Idea' },
  { value: 'prototipo', label: 'Prototipo' },
  { value: 'validado', label: 'Validado' },
]

export default function CatalogoPage() {
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState<Sector | ''>('')
  const [stage, setStage] = useState<ProjectStage | ''>('')

  const filtered = PROYECTOS.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.problem.toLowerCase().includes(search.toLowerCase()) ||
      p.authorName.toLowerCase().includes(search.toLowerCase())
    const matchSector = !sector || p.sector === sector
    const matchStage = !stage || p.stage === stage
    return matchSearch && matchSector && matchStage
  })

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Catálogo de proyectos</h1>
        <p className="text-gray-500 text-sm">
          {PROYECTOS.length} proyectos registrados — filtra por sector o etapa
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="input pl-9"
              placeholder="Buscar proyectos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Sector filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-gray-400" />
            <select
              className="select w-auto min-w-[180px]"
              value={sector}
              onChange={(e) => setSector(e.target.value as Sector | '')}
            >
              <option value="">Todos los sectores</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Stage filter */}
          <select
            className="select w-auto"
            value={stage}
            onChange={(e) => setStage(e.target.value as ProjectStage | '')}
          >
            <option value="">Todas las etapas</option>
            {STAGES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          {/* Clear */}
          {(search || sector || stage) && (
            <button
              onClick={() => { setSearch(''); setSector(''); setStage('') }}
              className="btn text-sm text-gray-500"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg mb-2">Sin resultados</p>
          <p className="text-sm">Prueba con otros filtros</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length} proyecto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
