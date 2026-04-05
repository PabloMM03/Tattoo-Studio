import express from 'express'
import {
  getTattoosController,
  createTattooController,
} from '../controllers/tattooController.js'

const router = express.Router()
router.get('/', getTattoosController)
router.post('/', createTattooController)

export default router
