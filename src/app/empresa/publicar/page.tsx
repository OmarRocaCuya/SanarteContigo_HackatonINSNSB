'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { SECTOR_COLORS } from '@/lib/data'
import type { Sector, SupportType } from '@/lib/types'

const SECTORS: Sector[] = [
  'Agricultura / Alimentario',
  'Cosméticos / Cuidado Personal',
  'Agricultura Sostenible / Agroindustria',
  'Envases / Manufactura',
  'Tecnología / Digital',
  'Salud',
]

const SUPPORT_OPTIONS: { value: SupportType; label: string; description: string }[] = [
  {
    value: 'piloto',
    label: 'Piloto técnico',
    description: 'Quiero probar la solución en mi empresa con acompañamiento del alumno',
  },
  {
    value: 'conocimiento',
    label: 'Transferencia de conocimiento',
    description: 'Necesito asesoría técnica o formación de mi equipo',
  },
  {
    value: 'mano_de_obra',
    label: 'Mano de obra técnica',
    description: 'Requiero apoyo técnico para implementar la solución',
  },
]

export default function PublicarNecesidadPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    sector: '' as Sector | '',
    title: '',
    description: '',
    supportType: '' as SupportType | '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => router.push('/empresa/dashboard'), 2500)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">¡Necesidad publicada!</h2>
        <p className="text-gray-500 text-sm">
          El sistema está calculando la compatibilidad con proyectos existentes.
          Recibirás los mejores matches en breve.
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
    <div className="max-w-xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Publicar necesidad</h1>
        <p className="text-gray-500 text-sm">
          Describe tu reto y el sistema encontrará proyectos que lo resuelvan
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {[
          { n: 1, label: 'Sector' },
          { n: 2, label: 'Descripción' },
          { n: 3, label: 'Tipo de apoyo' },
        ].map(({ n, label }, i) => (
          <div key={n} className="flex items-center gap-3 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-colors ${
                step > n
                  ? 'bg-gray-900 text-white'
                  : step === n
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step > n ? '✓' : n}
            </div>
            <span className={`text-sm ${step === n ? 'font-medium text-gray-900' : 'text-gray-400'}`}>
              {label}
            </span>
            {i < 2 && <div className="flex-1 h-px bg-gray-200 ml-2" />}
          </div>
        ))}
      </div>

      <div className="card">
        {/* Step 1: Sector */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              ¿En qué sector opera tu empresa?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Selecciona el sector más relevante para esta necesidad
            </p>
            <div className="grid grid-cols-2 gap-3">
              {SECTORS.map((s) => {
                const colors = SECTOR_COLORS[s] ?? { bg: '#F3F4F6', text: '#374151' }
                return (
                  <button
                    key={s}
                    onClick={() => {
                      set('sector', s)
                      setStep(2)
                    }}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all border-2 ${
                      form.sector === s ? 'border-gray-900' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2: Description */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Describe tu necesidad
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Sé específico: contexto, objetivo y resultado esperado
            </p>
            <div className="space-y-4">
              <div>
                <label className="label">Título de la necesidad</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ej: Reducir consumo de agua en riego de espárragos"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Descripción detallada</label>
                <textarea
                  className="textarea h-36"
                  placeholder="Describe el problema, el contexto de tu empresa, y qué resultados concretos esperas de una solución..."
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {form.description.length}/500 caracteres
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="btn flex-1">
                Atrás
              </button>
              <button
                onClick={() => form.title && form.description && setStep(3)}
                className="btn-primary flex-1"
                disabled={!form.title || !form.description}
              >
                Siguiente <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Support type */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              ¿Qué tipo de apoyo buscas?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Ayuda al sistema a encontrar el mejor match para tu necesidad
            </p>
            <div className="space-y-3">
              {SUPPORT_OPTIONS.map(({ value, label, description }) => (
                <button
                  key={value}
                  onClick={() => set('supportType', value)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    form.supportType === value
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      form.supportType === value ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                    }`}
                  >
                    {form.supportType === value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="btn flex-1">
                Atrás
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary flex-1"
                disabled={!form.supportType}
              >
                Publicar necesidad
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
