import api from '@/lib/axios'

export const customerService = {
  getAll: () => api.get('/customers'),
}
