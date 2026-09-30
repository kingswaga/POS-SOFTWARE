import api from '@/lib/axios'
import type { AxiosResponse } from 'axios'
import type { User } from '@/types'

type LoginResponse = {
  user: User
  token: string
}

export const authService = {
  login: (payload: { email: string; password: string }): Promise<AxiosResponse<LoginResponse>> =>
    api.post('/auth/login', payload),

  logout: (): Promise<AxiosResponse<{ message: string }>> =>
    api.post('/auth/logout'),
}
