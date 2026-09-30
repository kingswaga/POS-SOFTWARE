import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export class AppError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500
  logger.error(`${statusCode} - ${err.message} - ${req.originalUrl}`)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    // handle unique constraint, etc.
    return res.status(400).json({ message: 'Database error' })
  }

  return res.status(500).json({ message: 'Internal server error' })
}