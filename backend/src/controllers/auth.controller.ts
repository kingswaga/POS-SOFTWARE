import { Request, Response, NextFunction } from 'express'
import { authService } from '../services/auth.service'
import { loginSchema } from '../validators/auth.validator'

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = loginSchema.parse(req.body)
      const result = await authService.login(email, password)
      
      // Set token as HTTP-only cookie
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Clear the token cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      
      res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
      next(error)
    }
  },
}