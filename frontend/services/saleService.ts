import api from '@/lib/axios'
import { Sale } from '@/types'

export const saleService = {
  getAll: () => api.get<Sale[]>('/sales'),
  getById: (id: string) => api.get<Sale>(`/sales/${id}`),
  create: (data: {
    customerId?: string
    items: Array<{ productId: string; quantity: number; price: number }>
    total: number
  }) => api.post<Sale>('/sales', data),
}