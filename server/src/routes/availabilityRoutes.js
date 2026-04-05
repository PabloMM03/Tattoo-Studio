import express from 'express'
import {
  getAvailabilityController,
  createAvailabilityController,
} from '../controllers/availabilityController.js'

const router = express.Router()
router.get('/', getAvailabilityController)
router.post('/', createAvailabilityController)

export default router
