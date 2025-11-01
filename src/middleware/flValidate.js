import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { getUsers, getClUsers } from '../controllers/flRequests.js'

export const validateInvoice = [
    body('InvoiceID').optional({ nullable: true }).isInt().withMessage('InvoiceID must be a number'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('date').isISO8601().withMessage('Invalid date format'),
    body('discounts').optional().trim().escape(),
    body('coupons').optional().trim().escape(),
    body('notes').optional().trim().escape(),
    body('fees').optional().isNumeric().withMessage('Fees must be a number').toFloat(),

    (req, res, next) => {
        const hasMetaFields = req.body.InvoiceID || req.body.name || req.body.date
        const errors = validationResult(req)
        if (!hasMetaFields) {
            return next()
        } else if (hasMetaFields && !errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    }
]

export const validateClient = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().isEmail().withMessage('Email is required'),
    body('phone').isInt().isLength({ min: 10, max: 10}).withMessage('Phone must be a 10 digits'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    }
]

export const validateUserSignup = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().isEmail().withMessage('Email is required').custom((value) => {
        const existingUser = getUsers().find(u => u.email === value)
        if (existingUser) {
            throw new Error('Email already registered.')
        }
        return true
    }),
    body('phone').isInt().isLength({ min: 10, max: 10 }).withMessage('Phone is required'),
    body('pass').trim().notEmpty().withMessage('Pass is required'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    } 
]
export const validateClientSignup = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().isEmail().withMessage('Email is required').custom((value) => {
        const existingUser = getClUsers().find(u => u.email === value)
        if (existingUser) {
            throw new Error('Email already registered.')
        }
        return true
    }),
    body('phone').isInt().isLength({ min: 10, max: 10 }).withMessage('Phone is required'),
    body('pass').trim().notEmpty().withMessage('Pass is required'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    } 
]

export const validateUserLogin = [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email'),
    body('pass').trim().notEmpty().withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
        return next()
    }
]
export const validateClientLogin = [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email'),
    body('pass').trim().notEmpty().withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
        return next()
    }
]

export async function hashPass(userData) {
        return await bcrypt.hash(userData.pass, 10)
}
export async function comparePass(plain, hashed) {
    try {
        return await bcrypt.compare(plain, hashed)
    } catch (err) {
        throw new Error('Error comparing passwords')
    }
}
const KEY = process.env.JWT_KEY
export function genToken(userData) {
    return jwt.sign({id: userData.id, email: userData.email, role: userData.role}, KEY, {expiresIn: '1h'})
}
