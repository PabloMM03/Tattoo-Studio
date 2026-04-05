import db from '../config/db.js'

export const createOrder = async ({
  customer_name,
  customer_email,
  total,
  status,
  items_snapshot,
}) => {
  const [result] = await db.execute(
    `INSERT INTO orders (name, email, total, status, items_snapshot)
     VALUES (?, ?, ?, ?, ?)`,
    [
      customer_name,
      customer_email,
      total,
      status || 'pending',
      items_snapshot || null,
    ]
  )
  return result
}

export const getOrders = async () => {
  const [rows] = await db.execute('SELECT * FROM orders')
  return rows
}
