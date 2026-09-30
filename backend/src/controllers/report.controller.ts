import { Request, Response, NextFunction } from 'express'

export const reportController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json([])
    } catch (error) {
      next(error)
    }
  },
}
