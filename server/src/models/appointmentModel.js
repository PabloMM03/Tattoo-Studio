import db from '../config/db.js'

export const createAppointment = async ({
  name,
  email,
  date,
  time,
  description,
}) => {
  const [result] = await db.execute(
    `INSERT INTO appointments (name, email, date, time, description, status)
     VALUES (?, ?, ?, ?, ?, 'pending')`,
    [name, email, date, time, description]
  )
  return result
}

export const getAppointments = async () => {
  const [rows] = await db.execute('SELECT * FROM appointments')
  return rows
}

export const updateAppointmentStatus = async (id, status) => {
  const [result] = await db.execute(
    `UPDATE appointments SET status = ? WHERE id = ?`,
    [status, id]
  )
  return result
}
