import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import { logWarning, logger } from '../middleware/logger.js'


const KEY = process.env.JWT_KEY

export function authenticateToken(req, res, next) {
    const token = req.cookies.authToken

    if (!token) {
      logWarning(`Unauthorized access attempt to ${req.originalURL} from IP: ${req.ip}`)
      return res.status(401).json({ message: 'Server error unauthorized user.' })
    }

    jwt.verify(token, KEY, (err, decoded) => {
        if (err) {
          logger.error(`Invalid token attempt on ${req.originalURL} from IP: ${req.ip}`)
          return res.status(403).json({ message: 'FORBIDDEN.' })
        }
    req.user = decoded
    next()
    })
}
export function authenticateUser(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      logger.warn(`forbidden: User ${req.user?.id || 'unknown'} tried to access ${req.orginalURL}`)
      return res.status(403).json({message: 'FORBIDDEN: insufficient permissions'})
    }
    next()
  }
}

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

export function setCache(key, value, ttl , cache) {
  cache[key] = { value, expiry: Date.now() + ttl }
}

export function getCache(key, cache) {
  const cached = cache[key]
  if (!cached) {
    console.log("no cache")
    return null
  } 
  if (Date.now() > cached.expiry) {
    delete cache[key]
    console.log("expired cache")
    return null
  }
    console.log("yes cache")
    return cached.value
}
