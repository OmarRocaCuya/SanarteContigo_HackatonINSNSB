import { SECTOR_COLORS, MATCH_STATE_CONFIG, STAGE_CONFIG } from '@/lib/data'

interface BadgeProps {
  label: string
  variant?: 'sector' | 'stage' | 'matchState' | 'default'
  className?: string
}

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  let bg = '#F3F4F6'
  let text = '#374151'

  if (variant === 'sector') {
    const colors = SECTOR_COLORS[label]
    if (colors) {
      bg = colors.bg
      text = colors.text
    }
  } else if (variant === 'stage') {
    const config = STAGE_CONFIG[label]
    if (config) {
      bg = config.bg
      text = config.text
    }
  } else if (variant === 'matchState') {
    const config = MATCH_STATE_CONFIG[label]
    if (config) {
      bg = config.bg
      text = config.text
      label = config.label
    }
  }

  return (
    <span
      className={`badge ${className}`}
      style={{ backgroundColor: bg, color: text }}
    >
      {variant === 'matchState' ? MATCH_STATE_CONFIG[label]?.label ?? label : label}
    </span>
  )
}

export function SectorBadge({ sector }: { sector: string }) {
  const colors = SECTOR_COLORS[sector] ?? { bg: '#F3F4F6', text: '#374151' }
  return (
    <span
      className="badge"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {sector}
    </span>
  )
}

export function StageBadge({ stage }: { stage: string }) {
  const config = STAGE_CONFIG[stage] ?? { label: stage, bg: '#F3F4F6', text: '#374151' }
  return (
    <span
      className="badge"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  )
}

export function MatchStateBadge({ state }: { state: string }) {
  const config = MATCH_STATE_CONFIG[state] ?? {
    label: state,
    bg: '#F3F4F6',
    text: '#374151',
  }
  return (
    <span
      className="badge"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  )
}

export function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="badge bg-gray-100 text-gray-600">
      {score}% compatibilidad
    </span>
  )
}
