import db from '../config/db.js'

export const createAvailability = async ({ date, time, available }) => {
  const [result] = await db.execute(
    `INSERT INTO availability (date, time, available) VALUES (?, ?, ?)`,
    [date, time, available]
  )
  return result
}

export const getAvailability = async () => {
  const [rows] = await db.execute('SELECT * FROM availability')
  return rows
}
