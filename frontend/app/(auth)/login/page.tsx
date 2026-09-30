'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/authService'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await authService.login(data)
      setAuth(response.data.user, response.data.token)
      toast.success('Login successful')
      router.push('/')
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-content">
        <div className="auth-hero">
          <div className="hero-badge">Point of Sale</div>
          <h1>Fast, reliable checkout</h1>
          <p>Sign in to manage products, customers and sales — built for speed on the shop floor.</p>

          <div className="hero-metrics">
            <div className="metric">
              <strong>99.9%</strong>
              <span>Uptime</span>
            </div>
            <div className="metric">
              <strong>200+</strong>
              <span>Stores</span>
            </div>
            <div className="metric">
              <strong>1M+</strong>
              <span>Transactions</span>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-brand">
            <div className="brand-mark">P</div>
            <span>POSFlow</span>
          </div>

          <div className="login-header">
            <span>Welcome back</span>
            <h1 id="login-heading">Sign in</h1>
            <p>Access your retail dashboard and manage sales in real time.</p>
          </div>

          <div className="auth-security-pill">
            <ShieldCheck size={15} />
            Protected workspace
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form" role="form" aria-labelledby="login-heading">
            <div className="input-icon-wrap">
              <span className="input-icon">
                <Mail size={16} />
              </span>
              <Input
                id="login-email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                className="modern-input input-with-icon"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div className="input-icon-wrap">
              <span className="input-icon">
                <Lock size={16} />
              </span>
              <Input
                id="login-password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="modern-input input-with-icon"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <div className="auth-options">
              <label className="check-row">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-link">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="primary-btn w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
              {!isSubmitting && <ArrowRight size={16} />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}