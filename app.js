const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const contactsRouter = require('./routes/api/contacts')

// const e = process.env
// const PORT = e.PORT || 8083
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})
// app.listen(PORT, (err) => {
//   if (err) {
//     console.error('Error at a server launch', err)
//   }
// console.log(`Server work at port ${PORT}!`)
// })
module.exports = app
