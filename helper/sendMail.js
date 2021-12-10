require('dotenv').config()
const { SENDGRID_KEY } = process.env
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(SENDGRID_KEY)

const sendMail = async (data) => {
  const email = { ...data, from: 'muzishutka7@gmail.com' }
  await sgMail.send(email)
  return true
}

module.exports = sendMail
