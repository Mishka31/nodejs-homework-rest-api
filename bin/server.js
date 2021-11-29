const app = require('../app')
const mongoose = require('mongoose')
require('dotenv').config()
const { PORT = 8081, DB_HOST } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT)
    console.log(`MangoDB on port ${PORT} ✅ `)
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
