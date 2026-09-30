import prisma from '../lib/prisma'

export const reportRepository = {
  getAll: () => prisma.sale.findMany(),
}
