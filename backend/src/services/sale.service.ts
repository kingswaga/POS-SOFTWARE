import prisma from '../lib/prisma'
import { AppError } from '../middleware/errorHandler'
import { productRepository } from '../repositories/product.repository'

export const saleService = {
  create: async (data: { customerId?: string; items: any[]; total: number }) => {
    // Validate product stock and deduct
    const itemsWithProduct = await Promise.all(
      data.items.map(async (item) => {
        const product = await productRepository.findById(item.productId)
        if (!product) throw new AppError(`Product ${item.productId} not found`, 400)
        if (product.stock < item.quantity) {
          throw new AppError(`Insufficient stock for product ${product.name}`, 400)
        }
        return { ...item, product }
      })
    )

    // Use transaction to update stock and create sale
    const result = await prisma.$transaction(async (tx: any) => {
      // Update stock
      for (const item of itemsWithProduct) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      // Create sale
      const sale = await tx.sale.create({
        data: {
          customerId: data.customerId,
          total: data.total,
          items: {
            create: data.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { items: { include: { product: true } }, customer: true },
      })
      return sale
    })

    return result
  },

  getAll: () => prisma.sale.findMany({ include: { items: true, customer: true } }),
  getById: (id: string) => prisma.sale.findUnique({ where: { id }, include: { items: true } }),
}