// MODULE IMPORTS 
import https from 'https'
import fs from "fs";
import app from './src/app.js'

// HTTPS CONFIG 
const options = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem")
};
// EXPRESS APP 
const PORT = process.env.PORT || 5001
const server = https.createServer(options, app)

// ERROR HANDLING
server.on('error', (err) => {
  console.error('Server error:', err.message)
  process.exit(1)
})

// PUTTING SERVER ON PORT 
server.listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
