'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Restore auth state from localStorage if it exists
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        // Set placeholder token to indicate authenticated
        // Real token is in HTTP-only cookie, accessed by middleware and axios
        useAuthStore.setState({
          user,
          token: 'authenticated',
        })
      }
    } catch (error) {
      console.error('Failed to restore auth from localStorage:', error)
    }
  }, [])

  return <>{children}</>
}
