'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { authService } from '@/services/authService'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Products', icon: Package, href: '/products' },
  { label: 'Sales (POS)', icon: ShoppingCart, href: '/sales' },
  { label: 'Customers', icon: Users, href: '/customers' },
  { label: 'Reports', icon: BarChart3, href: '/reports' },
]

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

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
    <>
      {!open && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg text-slate-700"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      <aside className={clsx('sidebar-panel', open && 'open')}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-mark">P</div>
            <span>POSFlow</span>
          </div>

          <button className="lg:hidden text-white" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx('nav-link', isActive && 'active')}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}

          <button onClick={handleLogout} className="nav-link logout text-left">
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  )
}