'use client'

import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const { user, token, setAuth, logout } = useAuthStore()
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize auth from cookies on mount
    const initializeAuth = async () => {
      try {
        const storedToken = getCookie('token')
        
        if (storedToken && !token) {
          // Token exists in cookie but not in store, restore it
          // In a real app, you might want to validate this token with your backend
          const userData = localStorage.getItem('user')
          if (userData) {
            setAuth(JSON.parse(userData), storedToken as string)
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        logout()
      } finally {
        setIsInitialized(true)
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  useEffect(() => {
    // Persist user data to localStorage when auth changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    isInitialized,
    setAuth,
    logout,
  }
}
