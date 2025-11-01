import Stripe from "stripe"
import { hashPass, comparePass, genToken } from "../middleware/flValidate.js"
import { setCache, getCache } from "../utils/frAuthHelpers.js"

// data from frontend array 
const invoices = []
const paidInvs = []
const clients = []
const drafts = []
const userFr = []
const clInvoices = []
const clPaidInvs = []
const clAllInvs = []
const userCl = []
const clInvoiceCache = {}
const clientsCache = {}

// GET REQUESTS FROM THE INVOICE PAGE 
export function getInvoices(req, res) {
  res.json({unpaid: invoices, paid: paidInvs});
}
export function getDrafts(req, res) {
    res.json(drafts)
}
// GET REQUESTS FROM CLIENTS PAGE 
export function getClients(req, res) {
  const key = `clients:${req.id || "guest"}`
  const ttl = 30 * 60 * 1000 
  const cached = getCache(key, clientsCache)
  if (cached != null) {
    return res.json(cached)
  } else {
    setCache(key, clients, ttl, clientsCache)
    res.json(clients)
  }
}

export function getClInvoices(req, res) {
    const key = `clientInvoices:${req.InvoiceID || "guest"}`
    const ttl = 60_000
    const cached = getCache(key, clInvoiceCache)
    if (cached !== null) {
      return res.json(cached)
    } else {
      setCache(key, {unpaid: clInvoices, saved: clPaidInvs, all: clAllInvs}, ttl, clInvoiceCache)
      res.json({unpaid: clInvoices, saved: clPaidInvs, all: clAllInvs})
    }
}

// POST REQUESTS FROM THE INVOICE PAGE 
// create items then add items to invoice info to create invoices 
// add new invoice give invoice an id and calculate the total 
let invoiceItems = []
let totalPrice;
export function createInvoice(req, res) {
  const newInvoiceData = req.body
  const deletedInvIndex = invoices.findIndex((invoice) => invoice.InvID === newInvoiceData.id)
  if (newInvoiceData.comp === 'no' && newInvoiceData.del === 'no') {
    invoiceItems.push({...newInvoiceData})
    console.log('new item:', invoiceItems)
    return res.status(201).json({message: 'Item added'})
  } else if (newInvoiceData.comp === 'yes' && newInvoiceData.del === 'no') {
    if (invoiceItems.length > 0) {
      totalPrice = invoiceItems.reduce((sum, item) => sum + Number(item.price), 0)
    }
    console.log(totalPrice)
    newInvoiceData.total = totalPrice + newInvoiceData.fees
    newInvoiceData.item = invoiceItems
    if (newInvoiceData.InvoiceID === null) {
      newInvoiceData.InvoiceID = Math.floor(Math.random() * 3000)
    }
    invoices.push({...newInvoiceData})
    invoiceItems = []
    console.log('invoices:', invoices)
    console.log('invoice items:', invoiceItems)
    return res.status(201).json({message: 'Invoice created'})
  } else if (newInvoiceData.comp === 'yes' && newInvoiceData.del === 'yes') {
    invoices.splice(deletedInvIndex, 1)
    console.log('invoices:', invoices)
    return res.status(201).json({message: 'Invoice removed'})
  } else if (newInvoiceData.stat === 'paid') {
    console.log(newInvoiceData)
    const paidInv = invoices.find((invoice) => invoice.InvoiceID === newInvoiceData.id)
    paidInv.stat = 'Paid'
    const paidInvIndex = invoices.findIndex((invoice) => invoice.InvoiceID === newInvoiceData.id)
    const clPaidInvIndex = clInvoices.findIndex((invoice) => invoice.InvoiceID === newInvoiceData.id)
    paidInvs.push(paidInv)
    const existingUnpaidInv = clAllInvs.find((invoice) => invoice.InvoiceID === newInvoiceData.id)
    const ExsitingInvIndex = clAllInvs.findIndex((invoice) => invoice.InvoiceID === newInvoiceData.id)
    if (existingUnpaidInv) {
      clAllInvs.splice(ExsitingInvIndex, 1, paidInv)
    } else {
      clAllInvs.push(paidInv)
    }
    clPaidInvs.push(paidInv)
    invoices.splice(paidInvIndex, 1)
    clInvoices.splice(clPaidInvIndex, 1)
    console.log(clAllInvs, clInvoices, clPaidInvs, paidInvs)
  }
}
// POST RREQUESTS TO SEND THE INVOICE 
// send and email invoice functionss
export function sendInvoice(req, res) {
  const invData = req.body
  const markedInv = invoices.find((invoice) => invoice.InvoiceID === invData.id)
  const markedClient = userCl.find((client) => client.email === invData.email)
  const today = new Date()
  const dueDate = new Date(markedInv.due)
    if (dueDate < today) {
        markedInv.due = 'Overdue'
    }
  markedInv.stat = 'Unpaid'
  clInvoices.push(markedInv)
  clAllInvs.push(markedInv)
  res.status(201).json({message: 'invoice sent'})
}
// POST REQUESTS TO DRAFT THE INVOICE PAGE 
// draft or load/delete the drafted invoice 
export function createDraft(req, res) {
  const draftInvoiceData = req.body
  const prevIndex = drafts.findIndex((draft) => draft.invID === draftInvoiceData.invID)
  console.log(draftInvoiceData)
  if (draftInvoiceData.del === 'yes') {
    drafts.splice(prevIndex, 1)
    res.end()
  } else {
    drafts.push(draftInvoiceData)
    res.end()
  }
}
// POST REQUESTS FROM THE CLIENT PAGE 
// add new client or edit existing clients 
export function createClient(req, res) {
  const clientsData = req.body
  const prevIndex = clients.findIndex((client) => Number(client.id) === Number(clientsData.id))
    if (clientsData.del === 'yes') {
      clients.splice(prevIndex, 1)
      console.log('clients if', clients)
      return res.status(201).json({message: 'Client removed'})
    } else if (clientsData.del === 'no') {
      clients.splice(prevIndex, 1, clientsData)
      return res.status(201).json({message: 'Client info updated'})
    } else {
      clientsData.id = Math.floor(Math.random() * 500)
      clients.push(clientsData)
      return res.status(201).json({message: 'Client added'})
    }
} 

export async function signup(req, res) {
  const userData = req.body
  userData.id = Math.floor(Math.random() * 3000)
  const hashedPass = await hashPass(userData)
  userData.role = userData.role || 'freelancer'
  userData.pass = hashedPass
  const token = genToken(userData)
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000
  })
  userFr.push(userData)
  console.log("newUser:", userFr)
  console.log("users:", userFr)
  return res.status(201).json({token: token, message: 'account created'})
}
export async function clientSignup(req, res) {
  const userData = req.body
  userData.id = Math.floor(Math.random() * 3000)
  const hashedPass = await hashPass(userData)
  userData.role = userData.role || 'client'
  userData.pass = hashedPass
  const token = genToken(userData)
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000
  })
  userCl.push(userData)
  console.log("newUser:", userFr)
  console.log("users:", userFr)
  return res.status(201).json({token: token, message: 'account created'})
}

export async function login(req, res) {
  const userData = req.body
  userData.role = userData.role || 'freelancer'
  const existingUser = getUsers().find(u => u.email === userData.email)
  if (!existingUser) {
    return res.status(400).json({ message: 'Invalid email or password'})
  }
  const plain = userData.pass
  const hashed = existingUser.pass
  const compareHash = await comparePass(plain, hashed)
  if (!compareHash) {
    return res.status(400).json({ message: 'Invalid email or password'})
  }
  const token = genToken(existingUser)
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000
  })
  return res.status(200).json({ token: token, message: 'User logged in successfully'})
}
export async function clientLogin(req, res) {
  const userData = req.body
  userData.role = userData.role || 'client'
  const existingUser = userCl.find(u => u.email === userData.email)
  if (!existingUser) {
    return res.status(400).json({ message: 'Invalid email or password'})
  }
  const plain = userData.pass
  const hashed = existingUser.pass
  const compareHash = await comparePass(plain, hashed)
  if (!compareHash) {
    return res.status(400).json({ message: 'Invalid email or password'})
  }
  const token = genToken(existingUser)
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000
  })
  return res.status(200).json({ token: token, message: 'User logged in successfully'})
}

const stripe = new Stripe(process.env.STRIPE_KEY)
export async function createPaymentIntent(req, res) {
  try {
    const chargeData = req.body
    const {amount, currency} = chargeData
    console.log(amount, currency)
    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency,
      automatic_payment_methods: {enabled: true}
    })
    console.log(paymentIntent)
    res.json({clientSecret: paymentIntent.client_secret})
  } catch (err) {
    console.error(err)
    res.status(500).json({errors: 'Payment failed'})
  }
}

export const getUsers = () => userFr
export const getClUsers = () => userCl



