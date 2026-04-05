import { db } from '../db.js'

export const getProductsController = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products')
  res.json(rows)
}

export const getProductByIdController = async (req, res) => {
  const { id } = req.params
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id])
  res.json(rows[0])
}

export const createProductController = async (req, res) => {
  const { name, description, price, image_url, stock, category } = req.body
  const [result] = await db.query(
    'INSERT INTO products (name, description, price, image_url, stock, category) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, price, image_url, stock, category]
  )
  res.status(201).json({
    id: result.insertId,
    name,
    description,
    price,
    image_url,
    stock,
    category,
  })
}
