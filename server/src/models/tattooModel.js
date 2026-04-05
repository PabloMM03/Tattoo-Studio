import db from '../config/db.js'

export const createTattoo = async ({
  title,
  image_url,
  category,
  description,
}) => {
  const [result] = await db.execute(
    `INSERT INTO tattoos (title, image_url, category, description)
     VALUES (?, ?, ?, ?)`,
    [title, image_url, category, description || null]
  )
  return result
}

export const getTattoos = async () => {
  const [rows] = await db.execute('SELECT * FROM tattoos')
  return rows
}
