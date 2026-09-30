import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userRepository } from '../repositories/user.repository'
import { config } from '../config'
import { AppError } from '../middleware/errorHandler'

export const authService = {
  login: async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email)
    if (!user) throw new AppError('Invalid credentials', 401)

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new AppError('Invalid credentials', 401)

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    )

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user
    return { user: userWithoutPassword, token }
  },
}