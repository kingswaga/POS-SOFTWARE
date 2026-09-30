import { Router } from 'express'
import authRoutes from './auth.routes'
import productRoutes from './product.routes'
import saleRoutes from './sale.routes'
import customerRoutes from './customer.routes'
import reportRoutes from './report.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/sales', saleRoutes)
router.use('/customers', customerRoutes)
router.use('/reports', reportRoutes)

export default router