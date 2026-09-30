import { Request, Response, NextFunction } from 'express'
import { productService } from '../services/product.service'
import { createProductSchema, updateProductSchema } from '../validators/product.validator'

export const productController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getAll()
      res.json(products)
    } catch (error) {
      next(error)
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      const product = await productService.getById(id)
      if (!product) return res.status(404).json({ message: 'Product not found' })
      res.json(product)
    } catch (error) {
      next(error)
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createProductSchema.parse(req.body)
      const product = await productService.create(data)
      res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      const data = updateProductSchema.parse(req.body)
      const product = await productService.update(id, data)
      res.json(product)
    } catch (error) {
      next(error)
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      await productService.delete(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}