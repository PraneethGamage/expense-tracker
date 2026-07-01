import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

// Import routes
import transactionRoutes from './routes/transactionRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import subCategoryRoutes from './routes/subCategoryRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js'
import paymentMethodRoutes from './routes/paymentMethodRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// API Routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/subcategories', subCategoryRoutes)
app.use('/api/vendors', vendorRoutes)
app.use('/api/payment-methods', paymentMethodRoutes)
app.use('/api/analytics', analyticsRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`)
  console.log(`📊 API Documentation: http://localhost:${PORT}/api/`)
})
