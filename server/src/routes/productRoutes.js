import express from 'express'
import {
  getProductsController,
  getProductByIdController,
  createProductController,
} from '../controllers/productController.js'

const router = express.Router()
router.get('/', getProductsController)
router.get('/:id', getProductByIdController)
router.post('/', createProductController)

export default router
