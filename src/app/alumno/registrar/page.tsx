'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import type { Sector, ProjectStage } from '@/lib/types'

const SECTORS: Sector[] = [
  'Agricultura / Alimentario',
  'Cosméticos / Cuidado Personal',
  'Agricultura Sostenible / Agroindustria',
  'Envases / Manufactura',
  'Tecnología / Digital',
  'Salud',
]

const STAGES: { value: ProjectStage; label: string; description: string }[] = [
  { value: 'idea', label: 'Idea', description: 'Propuesta conceptual, sin implementación' },
  { value: 'prototipo', label: 'Prototipo', description: 'Desarrollo funcional en laboratorio o campo' },
  { value: 'validado', label: 'Validado', description: 'Resultados comprobados con datos reales' },
]

export default function RegistrarProyectoPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '',
    sector: '' as Sector | '',
    problem: '',
    stage: '' as ProjectStage | '',
    benefits: '',
    results: '',
    indicators: '',
    seekingInvestment: false,
  })

  const set = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }))

  const isValid =
    form.title && form.sector && form.problem && form.stage && form.benefits

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
    setTimeout(() => router.push('/alumno/dashboard'), 2500)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">¡Proyecto registrado!</h2>
        <p className="text-gray-500 text-sm">
          Tu proyecto está siendo analizado por el sistema de matching.
          Recibirás notificaciones si hay empresas con necesidades compatibles.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Registrar proyecto</h1>
        <p className="text-gray-500 text-sm">
          Completa la ficha de tu proyecto de innovación
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="card space-y-4">
          <h2 className="font-semibold text-gray-900">Información general</h2>

          <div>
            <label className="label">Título del proyecto *</label>
            <input
              type="text"
              className="input"
              placeholder="Ej: Sistema de riego tecnificado con sensores IoT"
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
            />
          </div>

          <div>
            <label className="label">Sector / Categoría *</label>
            <select
              className="select"
              required
              value={form.sector}
              onChange={(e) => set('sector', e.target.value)}
            >
              <option value="">Selecciona un sector</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Problema que resuelve *</label>
            <textarea
              className="textarea h-28"
              placeholder="Describe el problema que existe en la región o industria que tu proyecto soluciona..."
              required
              value={form.problem}
              onChange={(e) => set('problem', e.target.value)}
            />
          </div>
        </div>

        {/* Stage */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Etapa del proyecto *</h2>
          <div className="grid grid-cols-3 gap-3">
            {STAGES.map(({ value, label, description }) => (
              <button
                key={value}
                type="button"
                onClick={() => set('stage', value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  form.stage === value
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <p className="font-semibold text-sm text-gray-900 mb-1">{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="card space-y-4">
          <h2 className="font-semibold text-gray-900">Impacto y resultados</h2>

          <div>
            <label className="label">Beneficios concretos *</label>
            <textarea
              className="textarea h-24"
              placeholder="Describe los beneficios en términos comprensibles para una empresa (no técnicos). Ej: 'Reduce el costo de agua en 35%'"
              required
              value={form.benefits}
              onChange={(e) => set('benefits', e.target.value)}
            />
          </div>

          <div>
            <label className="label">Resultados y evidencia</label>
            <textarea
              className="textarea h-24"
              placeholder="Describe los resultados obtenidos hasta ahora: experimentos, pruebas, datos..."
              value={form.results}
              onChange={(e) => set('results', e.target.value)}
            />
          </div>

          <div>
            <label className="label">Indicadores clave</label>
            <input
              type="text"
              className="input"
              placeholder="Ej: Ahorro de agua: 35% | ROI: 8 meses | Área piloto: 2 Ha"
              value={form.indicators}
              onChange={(e) => set('indicators', e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">Separa los indicadores con | (barra vertical)</p>
          </div>
        </div>

        {/* Investment */}
        <div className="card">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                form.seekingInvestment ? 'bg-gray-900 border-gray-900' : 'border-gray-300'
              }`}
              onClick={() => set('seekingInvestment', !form.seekingInvestment)}
            >
              {form.seekingInvestment && (
                <svg viewBox="0 0 10 8" fill="none" className="w-3 h-3">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Busca inversión o financiamiento</p>
              <p className="text-xs text-gray-500">
                Marcar si tu proyecto necesita recursos económicos para escalar
              </p>
            </div>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={!isValid}
        >
          Registrar proyecto
        </button>
      </form>
    </div>
  )
}
