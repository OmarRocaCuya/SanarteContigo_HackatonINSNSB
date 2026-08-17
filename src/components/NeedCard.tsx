import Link from 'next/link'
import { MapPin, Wrench } from 'lucide-react'
import { SectorBadge } from './ui/Badge'
import { SUPPORT_TYPE_LABEL } from '@/lib/data'
import type { Necesidad } from '@/lib/types'

interface NeedCardProps {
  need: Necesidad
  href?: string
}

export function NeedCard({ need, href }: NeedCardProps) {
  return (
    <div className="card flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <SectorBadge sector={need.sector} />

      {/* Title + desc */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug line-clamp-2 mb-1">
          {need.title}
        </h3>
        <p className="text-[13px] text-gray-500 line-clamp-3 leading-relaxed">
          {need.description}
        </p>
      </div>

      {/* Support type */}
      <div className="flex items-center gap-1.5">
        <Wrench size={12} className="text-gray-400" />
        <span className="text-xs text-gray-500">
          {SUPPORT_TYPE_LABEL[need.supportType] ?? need.supportType}
        </span>
      </div>

      {/* Company */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs font-medium text-gray-700">{need.companyName}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="text-gray-400" />
            <p className="text-xs text-gray-400">{need.companyLocation}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400">{need.createdAt}</span>
      </div>

      {/* CTA */}
      {href && (
        <Link href={href} className="btn w-full text-center mt-1">
          Ver detalle →
        </Link>
      )}
    </div>
  )
}
