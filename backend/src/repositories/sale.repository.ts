import prisma from '../lib/prisma'

export const saleRepository = {
  findAll: () => prisma.sale.findMany({ include: { items: true, customer: true } }),
  findById: (id: string) => prisma.sale.findUnique({ where: { id }, include: { items: true } }),
  create: (data: any) => prisma.sale.create({ data }),
}
