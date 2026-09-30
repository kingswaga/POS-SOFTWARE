import { create } from 'zustand'
import { setCookie, deleteCookie } from 'cookies-next'
import { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => {
    // Save token to cookie
    setCookie('token', token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })
    // Save user to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))
    }
    set({ user, token })
  },
  logout: () => {
    deleteCookie('token')
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
    set({ user: null, token: null })
  },
}))