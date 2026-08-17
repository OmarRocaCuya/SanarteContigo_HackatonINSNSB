'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AlumnoRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/alumno/dashboard') }, [router])
  return null
}
