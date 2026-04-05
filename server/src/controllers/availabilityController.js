import { db } from '../db.js'

export const getAvailabilityController = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM availability')
  res.json(rows)
}

export const createAvailabilityController = async (req, res) => {
  const { date, time, available } = req.body
  const [result] = await db.query(
    'INSERT INTO availability (date, time, available) VALUES (?, ?, ?)',
    [date, time, available]
  )
  res.status(201).json({ id: result.insertId, date, time, available })
}
