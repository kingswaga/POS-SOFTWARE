'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/sidebar'
import Header from '@/components/layout/header'
import { useAuthStore } from '@/store/authStore'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, token } = useAuthStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize auth from localStorage if needed
    if (!token) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          useAuthStore.setState({
            user: JSON.parse(storedUser),
            token: 'token-exists', // Placeholder - real token is in cookie
          })
        } catch (e) {
          console.error('Failed to restore auth:', e)
        }
      }
    }
    setIsInitialized(true)
  }, [token])

  // Don't render until initialized
  if (!isInitialized) {
    return null
  }

  return (
    <div className="dashboard-shell">
      <div className="dashboard-layout">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="dashboard-main">
          <Header
            user={user}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <main className="page-content">{children}</main>
        </div>
      </div>
    </div>
  )
}