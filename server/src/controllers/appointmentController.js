import { db } from '../db.js'

// GET all appointments
export const getAppointmentsController = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM appointments')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST create appointment
export const createAppointmentController = async (req, res) => {
  const { name, email, date, time, description } = req.body
  try {
    const [result] = await db.query(
      'INSERT INTO appointments (name, email, date, time, description) VALUES (?, ?, ?, ?, ?)',
      [name, email, date, time, description]
    )
    res
      .status(201)
      .json({
        id: result.insertId,
        name,
        email,
        date,
        time,
        description,
        status: 'pending',
      })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// PATCH update appointment status
export const updateAppointmentStatusController = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    await db.query('UPDATE appointments SET status = ? WHERE id = ?', [
      status,
      id,
    ])
    res.json({ message: 'Appointment updated' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
