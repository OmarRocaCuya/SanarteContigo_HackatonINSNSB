'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EmpresaRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/empresa/dashboard') }, [router])
  return null
}
