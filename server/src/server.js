import express from 'express'
import dotenv from 'dotenv'
// server/src/server.js
import appointmentRoutes from './routes/appointmentRoutes.js'
import tattooRoutes from './routes/tattooRoutes.js'
import availabilityRoutes from './routes/availabilityRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())

// Rutas
app.use('/api/appointments', appointmentRoutes)
app.use('/api/tattoos', tattooRoutes)
app.use('/api/availability', availabilityRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
