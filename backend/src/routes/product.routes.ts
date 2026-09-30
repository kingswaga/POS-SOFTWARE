import { Router } from 'express'
import { productController } from '../controllers/product.controller'
import { authMiddleware, adminOnly } from '../middleware/auth'

const router = Router()

router.get('/', authMiddleware, productController.getAll)
router.get('/:id', authMiddleware, productController.getById)
router.post('/', authMiddleware, adminOnly, productController.create)
router.put('/:id', authMiddleware, adminOnly, productController.update)
router.delete('/:id', authMiddleware, adminOnly, productController.delete)

export default router