import prisma from '../lib/prisma'

export const productRepository = {
  findAll: () => prisma.product.findMany({ include: { category: true } }),
  findById: (id: string) => prisma.product.findUnique({ where: { id } }),
  findBySku: (sku: string) => prisma.product.findUnique({ where: { sku } }),
  create: (data: any) => prisma.product.create({ data }),
  update: (id: string, data: any) => prisma.product.update({ where: { id }, data }),
  delete: (id: string) => prisma.product.delete({ where: { id } }),
}