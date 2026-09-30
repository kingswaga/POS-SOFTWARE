import { Request, Response, NextFunction } from 'express'

export const customerController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json([])
    } catch (error) {
      next(error)
    }
  },
}
