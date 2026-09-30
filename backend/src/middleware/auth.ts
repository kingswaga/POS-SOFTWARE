import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { AppError } from './errorHandler'

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401))
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as any
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role }
    next()
  } catch (err) {
    return next(new AppError('Invalid token', 401))
  }
}

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return next(new AppError('Forbidden: Admin only', 403))
  }
  next()
}