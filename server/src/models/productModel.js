import db from '../config/db.js'

export const createProduct = async ({
  name,
  description,
  price,
  image_url,
  stock,
  category,
}) => {
  const [result] = await db.execute(
    `INSERT INTO products (name, description, price, image_url, stock, category)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      name,
      description || null,
      price,
      image_url || null,
      stock,
      category || null,
    ]
  )
  return result
}

export const getProducts = async () => {
  const [rows] = await db.execute('SELECT * FROM products')
  return rows
}

export const getProductById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id])
  return rows[0]
}
