'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if we're on the login page
    if (pathname === '/login') {
      return
    }

    // For protected routes, middleware will handle the redirect
    // This component just needs to exist for the layout protection
  }, [pathname, router])

  return <>{children}</>
}
