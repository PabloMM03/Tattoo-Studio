import { db } from '../db.js'

export const getTattoosController = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tattoos')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createTattooController = async (req, res) => {
  const { title, image_url, category, description } = req.body
  try {
    const [result] = await db.query(
      'INSERT INTO tattoos (title, image_url, category, description) VALUES (?, ?, ?, ?)',
      [title, image_url, category, description]
    )
    res
      .status(201)
      .json({ id: result.insertId, title, image_url, category, description })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
