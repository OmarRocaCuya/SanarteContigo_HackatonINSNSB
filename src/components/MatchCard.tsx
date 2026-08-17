import { MatchStateBadge, ScoreBadge } from './ui/Badge'
import { ArrowRight } from 'lucide-react'
import { MATCH_STATE_CONFIG } from '@/lib/data'
import type { Match, MatchState } from '@/lib/types'

interface MatchCardProps {
  match: Match
  onStateChange?: (matchId: string, newState: MatchState) => void
  showActions?: boolean
}

const STATE_ORDER: MatchState[] = [
  'contactado',
  'en_validacion',
  'piloto',
  'adoptado',
]

export function MatchCard({ match, onStateChange, showActions = false }: MatchCardProps) {
  const currentIndex = STATE_ORDER.indexOf(match.state as MatchState)

  return (
    <div className="card flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <ScoreBadge score={match.score} />
            <MatchStateBadge state={match.state} />
          </div>
        </div>
        <span className="text-xs text-gray-400 flex-shrink-0">{match.createdAt}</span>
      </div>

      {/* Project → Need */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-0.5">Proyecto</p>
          <p className="text-sm font-medium text-gray-900 line-clamp-1">{match.projectTitle}</p>
          <p className="text-xs text-gray-500">{match.studentName}</p>
        </div>
        <ArrowRight size={16} className="text-gray-300 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-0.5">Necesidad</p>
          <p className="text-sm font-medium text-gray-900 line-clamp-1">{match.needTitle}</p>
          <p className="text-xs text-gray-500">{match.companyName}</p>
        </div>
      </div>

      {/* Justification */}
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
          {match.justification}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1">
        {STATE_ORDER.map((s, i) => {
          const config = MATCH_STATE_CONFIG[s]
          const isActive = i <= currentIndex && match.state !== 'descartado'
          return (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="h-1.5 w-full rounded-full"
                style={{
                  backgroundColor: isActive ? config.bg : '#F3F4F6',
                }}
              />
              <span className="text-[10px] text-gray-400 text-center">{config.label}</span>
            </div>
          )
        })}
      </div>

      {/* Actions (institute view) */}
      {showActions && match.state !== 'adoptado' && match.state !== 'descartado' && (
        <div className="flex gap-2 pt-2 border-t border-gray-100 flex-wrap">
          {currentIndex < STATE_ORDER.length - 1 && (
            <button
              onClick={() => onStateChange?.(match.id, STATE_ORDER[currentIndex + 1])}
              className="btn flex-1 text-xs"
            >
              → {MATCH_STATE_CONFIG[STATE_ORDER[currentIndex + 1]]?.label}
            </button>
          )}
          <button
            onClick={() => onStateChange?.(match.id, 'descartado')}
            className="btn text-xs text-red-500 hover:bg-red-50"
          >
            Descartar
          </button>
        </div>
      )}
    </div>
  )
}
