import api from '@/lib/axios'

export const reportService = {
  getAll: () => api.get('/reports'),
}
