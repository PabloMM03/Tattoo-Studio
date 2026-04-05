import express from 'express'
import {
  getOrdersController,
  createOrderController,
} from '../controllers/orderController.js'

const router = express.Router()
router.get('/', getOrdersController)
router.post('/', createOrderController)

export default router
