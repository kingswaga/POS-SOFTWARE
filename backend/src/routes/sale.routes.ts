import { Router } from 'express'
import { saleController } from '../controllers/sale.controller'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.get('/', authMiddleware, saleController.getAll)
router.get('/:id', authMiddleware, saleController.getById)
router.post('/', authMiddleware, saleController.create)

export default router