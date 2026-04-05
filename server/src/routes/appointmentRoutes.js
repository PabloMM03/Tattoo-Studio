import express from 'express'
import {
  createAppointmentController,
  getAppointmentsController,
  updateAppointmentStatusController,
} from '../controllers/appointmentController.js'

const router = express.Router()

router.get('/', getAppointmentsController)
router.post('/', createAppointmentController)
router.patch('/:id', updateAppointmentStatusController)

export default router
