import express from 'express' 
import { createDraft,createInvoice, sendInvoice, getDrafts, getInvoices, getClients, createClient} from '../controllers/flRequests.js'
import { signup, login, clientLogin, clientSignup, createPaymentIntent, getClInvoices } from '../controllers/flRequests.js'
import { validateInvoice, validateUserSignup, validateClientSignup, validateClient, validateUserLogin, validateClientLogin } from '../middleware/flValidate.js'
import { authenticateToken, authenticateUser } from "../utils/frAuthHelpers.js"
import { getCache, setCache  } from '../utils/frAuthHelpers.js'
// GLOBAL VARIABLES 
const router = express.Router()
const pageCache = {}

// FR PAGE ROUTES 
router.get('/', (req, res) => {
  res.sendFile('landing-page1.html', { root: 'public'})
})
router.get('/dashboard', (req, res) => {
  authenticateUser('admin', 'freelancer')
  res.sendFile('index.html', { root: 'public/pages'})
})
router.get('/invoices', (req, res) => {
  authenticateUser('admin', 'freelancer')
  res.sendFile('invoices-page.html', { root: 'public/pages'})
})
router.get('/clients', (req, res) => {
  authenticateUser('admin', 'freelancer')
  res.sendFile('clients-page.html', { root: 'public/pages'})
})
router.get('/reports', (req, res) => {
  authenticateUser('admin', 'freelancer')
  res.sendFile('reports-page.html', { root: 'public/pages'})
})
// CL PAGE ROUTES
router.get('/client/dashboard', (req, res) => {
  authenticateUser('admin', 'client')
  res.sendFile('client-index.html', { root: 'public/pages'})
})
router.get('/client/invoices', (req, res) => {
  authenticateUser('admin', 'client')
  res.sendFile('client-invoice-page.html', { root: 'public/pages'})
})
router.get('/client/reports', (req, res) => {
  authenticateUser('admin', 'client')
  res.sendFile('client-reports-page.html', { root: 'public/pages'})
})
// SIGNUP AND LOG IN ROUTES
// freelancer signup/login routes
router.post('/api/login', validateUserLogin, login)
router.post('/api/signup', validateUserSignup, signup) 
// clients signup/login routes
router.post('/api/client/login', validateClientLogin, clientLogin)
router.post('/api/client/signup', validateClientSignup, clientSignup)
// FR API ROUTES 
router.get('/api/invoices', authenticateToken, authenticateUser('admin', 'freelancer', 'client'), getInvoices)
router.post('/api/invoices', authenticateToken, authenticateUser('admin', 'freelancer', 'client'), validateInvoice, createInvoice)
router.post('/api/invoices/send', authenticateToken, authenticateUser('admin', 'freelancer'), sendInvoice)
router.get('/api/invoices/drafts', authenticateToken, authenticateUser('admin', 'freelancer'), getDrafts)
router.post('/api/invoices/drafts', authenticateToken,authenticateUser('admin', 'freelancer'),  createDraft)
router.get('/api/clients', authenticateToken, authenticateUser('admin', 'freelancer'), getClients)
router.post('/api/clients', authenticateToken, authenticateUser('admin', 'freelancer'), validateClient, createClient)

// CL API ROUTES
router.get('/api/cl/Invoices', authenticateToken, authenticateUser('admin', 'client'), getClInvoices)
router.post('/api/create-payment-intent', authenticateUser('admin', 'client'), createPaymentIntent)


export default router