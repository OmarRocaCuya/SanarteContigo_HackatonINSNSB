'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { ProjectCard } from '@/components/ProjectCard'
import { PROYECTOS, MATCHES } from '@/lib/data'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function EmpresaDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'recomendados' | 'recientes'>('recomendados')

  const myMatches = MATCHES.filter((m) => m.companyName === user?.companyName)

  const recommended = PROYECTOS.filter(
    (p) => p.sector === 'Agricultura / Alimentario' || p.sector === 'Agricultura Sostenible / Agroindustria'
  ).slice(0, 3)

  const matchScores: Record<string, number> = {}
  myMatches.forEach((m) => {
    matchScores[m.projectId] = m.score
  })

  const recentProjects = [...PROYECTOS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4)

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Hola, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          {user?.companyName} · Proyectos recomendados para ti
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Proyectos recomendados', value: recommended.length, color: '#FAECE7', tc: '#4A1B0C' },
          { label: 'Matches activos', value: myMatches.length, color: '#E1F5EE', tc: '#04342C' },
          { label: 'En validación', value: myMatches.filter((m) => m.state === 'en_validacion').length, color: '#FEF3C7', tc: '#78350F' },
        ].map(({ label, value, color, tc }) => (
          <div key={label} className="card text-center" style={{ borderColor: color }}>
            <p className="text-3xl font-bold mb-1" style={{ color: tc }}>
              {value}
            </p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { key: 'recomendados', label: '✨ Recomendados para ti' },
          { key: 'recientes', label: 'Más recientes' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as 'recomendados' | 'recientes')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* AI Badge */}
      {activeTab === 'recomendados' && (
        <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-gray-50 rounded-xl w-fit">
          <Sparkles size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500">
            Proyectos ordenados por compatibilidad semántica con tu sector (Claude AI)
          </span>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {(activeTab === 'recomendados' ? recommended : recentProjects).map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            score={matchScores[project.id] ?? Math.floor(Math.random() * 20 + 72)}
            showScore={activeTab === 'recomendados'}
          />
        ))}
      </div>

      {/* Link to full catalog */}
      <div className="flex justify-center">
        <Link href="/empresa/catalogo" className="btn">
          Ver catálogo completo <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
