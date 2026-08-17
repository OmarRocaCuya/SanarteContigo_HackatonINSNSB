'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function InstitutoRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/instituto/dashboard') }, [router])
  return null
}
