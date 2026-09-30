import { productRepository } from '../repositories/product.repository'
import { AppError } from '../middleware/errorHandler'

export const productService = {
  getAll: () => productRepository.findAll(),
  getById: (id: string) => productRepository.findById(id),
  create: async (data: any) => {
    // Check if SKU exists
    const existing = await productRepository.findBySku(data.sku) // add method
    if (existing) throw new AppError('SKU already exists', 400)
    return productRepository.create(data)
  },
  update: (id: string, data: any) => productRepository.update(id, data),
  delete: (id: string) => productRepository.delete(id),
}