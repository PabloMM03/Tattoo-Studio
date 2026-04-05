import db from './config/db.js'

const testConnection = async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result')
    console.log('Conexión exitosa a DB:', rows[0].result)
    process.exit(0)
  } catch (error) {
    console.error('Error conectando a DB:', error)
    process.exit(1)
  }
}

testConnection()
