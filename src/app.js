import express from 'express'
import helmet from 'helmet'
import { xss } from 'express-xss-sanitizer'
import flRoutes from './routes/flRoutes.js'
import clRoutes from './routes/clRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { limiter } from './utils/frAuthHelpers.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { logger } from './middleware/logger.js'
// GLOBAL VARIABLES 
const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)


const app = express()
const publicPath = process.env.PUBLIC_DIR
// MIDDLEWARE
app.use(helmet.contentSecurityPolicy({
   useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com/v3/"],
      frameSrc: ["'self'", "https://js.stripe.com"],
      connectSrc: ["'self'", "https://api.stripe.com"],
      imgSrc: ["'self'", "data:", "https://*.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'"], 
    },
}))
app.use(xss())
app.use(limiter)
app.use(cors({
  origin: 'https://localhost:5001',
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, publicPath), {
  maxAge: 30 * 60 * 1000,
}))
app.use((err, req, res, next) => {
  logger.error(`Route: ${req.method} ${req.originalURL} - Error: ${err.message}`)
  res.status(err.status || 500).json({message: err.message || 'Internal Server Error'})
})

// ROUTES 
app.use(flRoutes)
app.use(clRoutes)

// ERROR HANDLING 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app