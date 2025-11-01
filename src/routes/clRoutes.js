import express from 'express'
const server = express()

server.get('/cl', (req, res) => {
  res.sendFile('landing-page2.html', { root: 'public/pages'})
})

export default server