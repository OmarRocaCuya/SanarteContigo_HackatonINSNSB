'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  TrendingUp,
  FlaskConical,
  Lightbulb,
  DollarSign,
  Mail,
  User,
  Building2,
  GraduationCap,
} from 'lucide-react'
import { PROYECTOS, MATCHES } from '@/lib/data'
import { SectorBadge, StageBadge } from '@/components/ui/Badge'

const STAGE_ICONS = {
  idea: Lightbulb,
  prototipo: FlaskConical,
  validado: TrendingUp,
}

export default function ProyectoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = PROYECTOS.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Proyecto no encontrado</p>
        <Link href="/empresa/catalogo" className="btn mt-4">
          ← Volver al catálogo
        </Link>
      </div>
    )
  }

  const StageIcon = STAGE_ICONS[project.stage]
  const match = MATCHES.find((m) => m.projectId === project.id)

  return (
    <div className="max-w-3xl">
      {/* Back */}
      <Link
        href="/empresa/catalogo"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Volver al catálogo
      </Link>

      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <SectorBadge sector={project.sector} />
            <StageBadge stage={project.stage} />
            {project.seekingInvestment && (
              <span className="badge" style={{ backgroundColor: '#FEF9C3', color: '#713F12' }}>
                <DollarSign size={10} className="mr-1" />
                Busca inversión
              </span>
            )}
          </div>
          {match && (
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-400 mb-1">Compatibilidad contigo</p>
              <p className="text-2xl font-bold text-gray-900">{match.score}%</p>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Building2 size={14} />
            {project.institute}
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap size={14} />
            {project.authorProgram}
          </div>
          <div className="flex items-center gap-1.5">
            <StageIcon size={14} />
            {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-5">
        {/* Problem */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-xs">1</span>
            Problema que resuelve
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">{project.problem}</p>
        </div>

        {/* Benefits (for companies — non-technical language) */}
        <div className="card" style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }}>
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center text-xs">2</span>
            Beneficios concretos para tu empresa
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{project.benefits}</p>
        </div>

        {/* Results */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-xs">3</span>
            Resultados y evidencia
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">{project.results}</p>
        </div>

        {/* Indicators */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-xs">4</span>
            Indicadores clave
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.indicators.split('|').map((ind) => (
              <div key={ind} className="bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-700">
                {ind.trim()}
              </div>
            ))}
          </div>
        </div>

        {/* Author */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-xs">
              <User size={10} />
            </span>
            Sobre el autor
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <GraduationCap size={22} className="text-gray-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{project.authorName}</p>
              <p className="text-sm text-gray-500">{project.authorProgram}</p>
              <p className="text-xs text-gray-400">{project.institute} · Promoción 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-8 mt-8">
        <div className="card shadow-lg flex items-center justify-between gap-4 border-gray-200">
          <div>
            <p className="font-semibold text-gray-900 text-sm">¿Te interesa este proyecto?</p>
            <p className="text-xs text-gray-500">El instituto coordinará el contacto inicial</p>
          </div>
          <a
            href={`mailto:vinculacion@iestp-pacaran.edu.pe?subject=Interés en proyecto: ${project.title}`}
            className="btn-primary flex items-center gap-2 flex-shrink-0"
          >
            <Mail size={14} />
            Contactar
          </a>
        </div>
      </div>
    </div>
  )
}
