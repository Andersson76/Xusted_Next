// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const next = require('next')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors')
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON bodies
app.use(express.json())

// Use CORS middleware
app.use(
  cors({
    origin: '*', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true, // Allow cookies to be sent
  }),
)

nextApp.prepare().then(() => {
  // POST endpoint to handle form submission
  app.post('/api/send-email', async (req, res) => {
    try {
      const { name, email, message } = req.body

      // Create reusable transporter object using SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your password
        },
      })

      // Setup email data
      let mailOptions = {
        from: `${name} <${email}>`, // sender address
        to: process.env.EMAIL_TO, // receiver address
        subject: 'New Message from Contact Form', // Subject line
        text: message, // plain text body
      }

      // Send mail with defined transport object
      await transporter.sendMail(mailOptions)

      res.status(200).json({ message: 'Email sent successfully!' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ error: 'Failed to send email' })
    }
  })

  // Catch all other requests and forward to Next.js
  app.all('*', (req, res) => {
    return handle(req, res)
  })

  // Start server
  app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server running on http://localhost:${PORT}`)
  })
})
