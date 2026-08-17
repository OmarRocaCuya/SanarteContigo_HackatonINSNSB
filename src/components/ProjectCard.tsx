import Link from 'next/link'
import { TrendingUp, FlaskConical, Lightbulb, DollarSign } from 'lucide-react'
import { SectorBadge, StageBadge, ScoreBadge } from './ui/Badge'
import type { Proyecto } from '@/lib/types'

interface ProjectCardProps {
  project: Proyecto
  score?: number
  showScore?: boolean
  href?: string
}

const STAGE_ICONS = {
  idea: Lightbulb,
  prototipo: FlaskConical,
  validado: TrendingUp,
}

export function ProjectCard({ project, score, showScore = false, href }: ProjectCardProps) {
  const StageIcon = STAGE_ICONS[project.stage]
  const cardHref = href ?? `/empresa/proyectos/${project.id}`

  return (
    <div className="card flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <SectorBadge sector={project.sector} />
        {showScore && score !== undefined && <ScoreBadge score={score} />}
      </div>

      {/* Title */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug line-clamp-2 mb-1">
          {project.title}
        </h3>
        <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed">
          {project.problem}
        </p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <StageBadge stage={project.stage} />
        {project.seekingInvestment && (
          <span className="badge" style={{ backgroundColor: '#FEF9C3', color: '#713F12' }}>
            <DollarSign size={10} className="mr-1" />
            Busca inversión
          </span>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs font-medium text-gray-700">{project.authorName}</p>
          <p className="text-xs text-gray-400">{project.authorProgram}</p>
        </div>
        <StageIcon size={14} className="text-gray-400" />
      </div>

      {/* CTA */}
      <Link
        href={cardHref}
        className="btn w-full text-center mt-1"
      >
        Ver ficha →
      </Link>
    </div>
  )
}
