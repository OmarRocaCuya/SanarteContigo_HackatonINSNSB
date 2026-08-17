'use client'

import { useState } from 'react'
import { MATCHES } from '@/lib/data'
import { MatchCard } from '@/components/MatchCard'
import type { Match, MatchState } from '@/lib/types'

const STATE_FILTERS = [
  { value: '', label: 'Todos' },
  { value: 'contactado', label: 'Contactado' },
  { value: 'en_validacion', label: 'En validación' },
  { value: 'piloto', label: 'Piloto' },
  { value: 'adoptado', label: 'Adoptado' },
  { value: 'descartado', label: 'Descartado' },
]

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>(MATCHES)
  const [filterState, setFilterState] = useState<MatchState | ''>('')

  const handleStateChange = (matchId: string, newState: MatchState) => {
    setMatches((ms) =>
      ms.map((m) =>
        m.id === matchId
          ? {
              ...m,
              state: newState,
              stateHistory: [
                ...m.stateHistory,
                { state: newState, date: new Date().toISOString().slice(0, 10) },
              ],
            }
          : m
      )
    )
  }

  const filtered = matches.filter(
    (m) => !filterState || m.state === filterState
  )

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Matches y seguimiento</h1>
        <p className="text-gray-500 text-sm">
          Gestiona el estado de cada vinculación y avanza el flujo hasta la adopción
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 flex-wrap w-fit">
        {STATE_FILTERS.map(({ value, label }) => {
          const count = value
            ? matches.filter((m) => m.state === value).length
            : matches.length
          return (
            <button
              key={value}
              onClick={() => setFilterState(value as MatchState | '')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                filterState === value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  filterState === value ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Match list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p>No hay matches en este estado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onStateChange={handleStateChange}
              showActions
            />
          ))}
        </div>
      )}

      {/* Info box */}
      <div className="mt-8 bg-purple-50 rounded-2xl p-5" style={{ backgroundColor: '#EEEDFE' }}>
        <h3 className="font-semibold text-sm mb-2" style={{ color: '#26215C' }}>
          ¿Cómo funciona el seguimiento?
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: '#26215C', opacity: 0.8 }}>
          Cada match pasa por etapas: <strong>Contactado → En validación → Piloto → Adoptado</strong>.
          Al avanzar el estado, la plataforma registra la fecha automáticamente para generar
          evidencia trazable de vinculación academia-industria para tu reporte SINEACE/CONEACES.
        </p>
      </div>
    </div>
  )
}
