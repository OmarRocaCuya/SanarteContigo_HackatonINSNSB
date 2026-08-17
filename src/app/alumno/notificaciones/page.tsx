'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { NOTIFICACIONES } from '@/lib/data'
import { SectorBadge } from '@/components/ui/Badge'
import { Bell, Building2, Check } from 'lucide-react'
import Link from 'next/link'

export default function NotificacionesPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState(
    NOTIFICACIONES.filter((n) => n.userId === user?.id)
  )

  const markAllRead = () => {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: string) => {
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Notificaciones</h1>
          <p className="text-gray-500 text-sm">
            {unreadCount > 0 ? `${unreadCount} sin leer` : 'Todo al día'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="btn text-sm">
            <Check size={14} />
            Marcar todo como leído
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card text-center py-16">
          <Bell size={40} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-400">No tienes notificaciones</p>
          <p className="text-sm text-gray-400 mt-1">
            Recibirás alertas cuando empresas publiquen necesidades en tu sector
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`card transition-all ${
                !notif.read ? 'ring-1 ring-blue-100 bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    !notif.read ? 'bg-blue-100' : 'bg-gray-100'
                  }`}
                >
                  <Building2 size={18} className={!notif.read ? 'text-blue-600' : 'text-gray-400'} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <SectorBadge sector={notif.sector} />
                    <span className="text-xs text-gray-400 flex-shrink-0">{notif.createdAt}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-0.5">
                    {notif.companyName}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    publicó una necesidad relacionada con tu sector: <span className="font-medium">&ldquo;{notif.needTitle}&rdquo;</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/alumno/necesidades"
                      className="btn text-xs"
                      onClick={() => markRead(notif.id)}
                    >
                      Ver necesidad →
                    </Link>
                    {!notif.read && (
                      <button
                        onClick={() => markRead(notif.id)}
                        className="text-xs text-gray-400 hover:text-gray-600"
                      >
                        Marcar como leído
                      </button>
                    )}
                  </div>
                </div>

                {/* Unread dot */}
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state info */}
      {notifications.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-2xl p-4 text-center">
          <p className="text-xs text-gray-500">
            Recibes notificaciones cuando empresas publican necesidades en tu sector.
            <br />
            Tu sector actual: <span className="font-medium">Computación e Informática</span>
          </p>
        </div>
      )}
    </div>
  )
}
