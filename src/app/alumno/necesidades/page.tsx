'use client'

import { useState } from 'react'
import { NECESIDADES, SUPPORT_TYPE_LABEL } from '@/lib/data'
import { SectorBadge } from '@/components/ui/Badge'
import { Search, MapPin, Wrench } from 'lucide-react'
import type { Sector } from '@/lib/types'

export default function NecesidadesPage() {
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState<Sector | ''>('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = NECESIDADES.filter((n) => {
    const matchSearch =
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase()) ||
      n.companyName.toLowerCase().includes(search.toLowerCase())
    const matchSector = !sector || n.sector === sector
    return matchSearch && matchSector
  })

  const selectedNeed = NECESIDADES.find((n) => n.id === selected)

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Necesidades de empresas</h1>
        <p className="text-gray-500 text-sm">
          {NECESIDADES.length} necesidades activas — encuentra una que tu proyecto pueda resolver
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="input pl-9"
            placeholder="Buscar por empresa, sector..."
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
          {['Agricultura / Alimentario', 'Envases / Manufactura', 'Cosméticos / Cuidado Personal', 'Agricultura Sostenible / Agroindustria'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Split view */}
      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 space-y-4 min-w-0">
          {filtered.map((need) => (
            <button
              key={need.id}
              onClick={() => setSelected(need.id === selected ? null : need.id)}
              className={`w-full text-left card hover:shadow-md transition-all ${
                selected === need.id ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <SectorBadge sector={need.sector} />
                <span className="text-xs text-gray-400 ml-auto">{need.createdAt}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                {need.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{need.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin size={11} />
                  {need.companyLocation}
                </div>
                <div className="flex items-center gap-1">
                  <Wrench size={11} />
                  {SUPPORT_TYPE_LABEL[need.supportType]}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-700">{need.companyName}</p>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p>Sin resultados para tu búsqueda</p>
            </div>
          )}
        </div>

        {/* Detail pane */}
        {selectedNeed && (
          <div className="w-96 flex-shrink-0">
            <div className="card sticky top-8">
              <div className="flex items-start justify-between gap-2 mb-4">
                <SectorBadge sector={selectedNeed.sector} />
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  ×
                </button>
              </div>

              <h2 className="font-bold text-gray-900 text-base mb-3">{selectedNeed.title}</h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {selectedNeed.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 w-24 text-xs">Empresa</span>
                  <span className="font-medium text-gray-900 text-sm">{selectedNeed.companyName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 w-24 text-xs">Ubicación</span>
                  <span className="text-gray-700 text-sm">{selectedNeed.companyLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 w-24 text-xs">Tipo de apoyo</span>
                  <span className="text-gray-700 text-sm">{SUPPORT_TYPE_LABEL[selectedNeed.supportType]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 w-24 text-xs">Publicado</span>
                  <span className="text-gray-700 text-sm">{selectedNeed.createdAt}</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-green-800 font-medium mb-1">¿Tu proyecto puede responder esta necesidad?</p>
                <p className="text-xs text-green-700">
                  El sistema de matching conectará automáticamente tu proyecto con esta empresa si hay compatibilidad.
                </p>
              </div>

              <a
                href={`mailto:vinculacion@iestp-pacaran.edu.pe?subject=Propongo mi proyecto para: ${selectedNeed.title}`}
                className="btn-primary w-full text-center"
              >
                Proponer mi proyecto
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
