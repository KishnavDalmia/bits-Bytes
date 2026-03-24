import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRouter from './routes/authRoute.js'
import orderRouter from './routes/orderRoute.js'
import connectDB from './config/db.js'
import session from './config/session.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session)

app.use('/api/auth', authRouter)
app.use('/api/orders', orderRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})