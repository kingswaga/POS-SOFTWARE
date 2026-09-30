import { Request, Response, NextFunction } from 'express'
import { saleService } from '../services/sale.service'

export const saleController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sales = await saleService.getAll()
      res.json(sales)
    } catch (error) {
      next(error)
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      const sale = await saleService.getById(id)
      if (!sale) return res.status(404).json({ message: 'Sale not found' })
      res.json(sale)
    } catch (error) {
      next(error)
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sale = await saleService.create(req.body)
      res.status(201).json(sale)
    } catch (error) {
      next(error)
    }
  },
}
