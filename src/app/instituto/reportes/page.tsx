'use client'

import { useState } from 'react'
import { PROYECTOS, NECESIDADES, MATCHES, MATCH_STATE_CONFIG } from '@/lib/data'
import { MatchStateBadge, SectorBadge, StageBadge } from '@/components/ui/Badge'
import { Download, FileText, Calendar, Building2, GraduationCap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ReportesPage() {
  const { user } = useAuth()
  const [dateFrom, setDateFrom] = useState('2026-01-01')
  const [dateTo, setDateTo] = useState('2026-12-31')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const filteredMatches = MATCHES.filter((m) => {
    const d = new Date(m.createdAt)
    return d >= new Date(dateFrom) && d <= new Date(dateTo)
  })

  const filteredProjects = PROYECTOS.filter((p) => {
    const d = new Date(p.createdAt)
    return d >= new Date(dateFrom) && d <= new Date(dateTo)
  })

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)

      // Simulate CSV download
      const csv = [
        ['Reporte de Vinculación Academia-Industria — ' + user?.institute],
        ['Período:', `${dateFrom} al ${dateTo}`],
        [''],
        ['PROYECTOS REGISTRADOS'],
        ['Título', 'Sector', 'Etapa', 'Alumno', 'Carrera', 'Fecha'],
        ...filteredProjects.map((p) => [
          p.title, p.sector, p.stage, p.authorName, p.authorProgram, p.createdAt,
        ]),
        [''],
        ['MATCHES GENERADOS'],
        ['Proyecto', 'Necesidad', 'Empresa', 'Alumno', 'Score', 'Estado', 'Fecha'],
        ...filteredMatches.map((m) => [
          m.projectTitle, m.needTitle, m.companyName, m.studentName,
          `${m.score}%`, MATCH_STATE_CONFIG[m.state]?.label, m.createdAt,
        ]),
      ]
      const csvContent = csv.map((r) => r.join(',')).join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `reporte-vinculacion-${dateFrom}-${dateTo}.csv`
      a.click()
      URL.revokeObjectURL(url)
    }, 1500)
  }

  const advancedMatches = filteredMatches.filter(
    (m) => m.state === 'en_validacion' || m.state === 'piloto' || m.state === 'adoptado'
  )

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Reportes de evidencia</h1>
        <p className="text-gray-500 text-sm">
          Genera reportes de vinculación academia-industria para SINEACE / CONEACES
        </p>
      </div>

      {/* Period selector */}
      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar size={16} />
          Período del reporte
        </h2>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[140px]">
            <label className="label">Desde</label>
            <input
              type="date"
              className="input"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="label">Hasta</label>
            <input
              type="date"
              className="input"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn-primary flex items-center gap-2"
            >
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Download size={14} />
                  Descargar CSV
                </>
              )}
            </button>
          </div>
        </div>
        {generated && (
          <p className="text-sm text-green-600 mt-3 flex items-center gap-1.5">
            <FileText size={14} />
            Reporte descargado exitosamente
          </p>
        )}
      </div>

      {/* Preview */}
      <div className="space-y-6">
        {/* Summary */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Resumen del período</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Proyectos', value: filteredProjects.length, icon: GraduationCap },
              { label: 'Necesidades', value: NECESIDADES.length, icon: Building2 },
              { label: 'Matches totales', value: filteredMatches.length, icon: FileText },
              { label: 'Con seguimiento avanzado', value: advancedMatches.length, icon: FileText },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects table */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap size={16} />
            Proyectos de innovación registrados
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 text-xs font-medium text-gray-400 pr-4">Proyecto</th>
                  <th className="pb-3 text-xs font-medium text-gray-400 pr-4">Sector</th>
                  <th className="pb-3 text-xs font-medium text-gray-400 pr-4">Etapa</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Alumno</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-gray-900 text-xs line-clamp-1">{p.title}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <SectorBadge sector={p.sector} />
                    </td>
                    <td className="py-3 pr-4">
                      <StageBadge stage={p.stage} />
                    </td>
                    <td className="py-3">
                      <p className="text-xs text-gray-700">{p.authorName}</p>
                      <p className="text-xs text-gray-400">{p.authorProgram}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Matches table */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 size={16} />
            Vinculaciones con empresas
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 text-xs font-medium text-gray-400 pr-4">Proyecto</th>
                  <th className="pb-3 text-xs font-medium text-gray-400 pr-4">Empresa</th>
                  <th className="pb-3 text-xs font-medium text-gray-400 pr-4">Score</th>
                  <th className="pb-3 text-xs font-medium text-gray-400 pr-4">Estado</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredMatches.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-gray-900 text-xs line-clamp-1">{m.projectTitle}</p>
                      <p className="text-xs text-gray-400">{m.studentName}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-xs text-gray-700">{m.companyName}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-xs font-semibold text-gray-900">{m.score}%</span>
                    </td>
                    <td className="py-3 pr-4">
                      <MatchStateBadge state={m.state} />
                    </td>
                    <td className="py-3">
                      <span className="text-xs text-gray-400">{m.createdAt}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SINEACE note */}
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: '#EEEDFE', borderLeft: '4px solid #26215C' }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: '#26215C' }}>
            Nota para acreditación SINEACE / CONEACES
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#26215C', opacity: 0.8 }}>
            Este reporte constituye evidencia de <strong>vinculación academia-industria</strong>
            (Estándar 21 — SINEACE) y <strong>seguimiento de egresados</strong> (Estándar 28).
            El CSV exportado puede adjuntarse directamente al expediente de acreditación.
            Los matches en estado <em>Piloto</em> o <em>Adoptado</em> representan el nivel
            más alto de vinculación demostrable.
          </p>
        </div>
      </div>
    </div>
  )
}
