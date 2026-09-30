'use client'

import { Menu, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/authService'

export default function Header({
  user,
  toggleSidebar,
}: {
  user: { name: string } | null
  toggleSidebar: () => void
}) {
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authService.logout()
    } finally {
      logout()
      router.replace('/login')
      router.refresh()
    }
  }

  return (
    <header className="topbar">
      <button
        onClick={toggleSidebar}
        className="block lg:hidden text-slate-700"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      <div className="topbar-title">POS Dashboard</div>

      <div className="topbar-user">
        <div className="user-pill">
          <span className="user-avatar">{(user?.name ?? 'G').charAt(0).toUpperCase()}</span>
          <span>{user?.name ?? 'Guest'}</span>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-slate-900 px-3 py-2 text-white hover:bg-slate-700"
          aria-label="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}
