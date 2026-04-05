import { db } from '../db.js'

export const getOrdersController = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM orders')
  res.json(rows)
}

export const createOrderController = async (req, res) => {
  const { customer_name, customer_email, total, status, items_snapshot } =
    req.body
  const [result] = await db.query(
    'INSERT INTO orders (customer_name, customer_email, total, status, items_snapshot) VALUES (?, ?, ?, ?, ?)',
    [customer_name, customer_email, total, status, items_snapshot]
  )
  res
    .status(201)
    .json({
      id: result.insertId,
      customer_name,
      customer_email,
      total,
      status,
      items_snapshot,
    })
}
