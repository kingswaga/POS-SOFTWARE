import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler'
import { logger } from './utils/logger'
import routes from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// CORS configuration
const configuredFrontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
const allowedOrigins = new Set([configuredFrontendUrl, 'http://localhost:3000', 'http://localhost:3001'])
const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Origin is not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

// Middleware
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }))

// Routes
app.use('/api', routes)

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }))

// Global error handler
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})