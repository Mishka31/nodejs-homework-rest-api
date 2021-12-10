const gravatar = require('gravatar')
const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const { User } = require('../../model')
const sendMail = require('../../helper')

const register = async (req, res) => {
  const { email, password } = req.body
  const verificationToken = nanoid()
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with email=${email} already exist`)
  }

  const avatarURL = gravatar.url('misha@gmail.com')

  const newUser = new User({ email, avatarURL, verificationToken })
  newUser.setPassword(password)
  await newUser.save()

  const mail = {
    to: email,
    subject: 'Confirm registration',
    html: `<a href='http://localhost:8081/api/user/verify/${verificationToken}'> Please click to confirm email </a>`,
  }
  await sendMail(mail)

  res.status(201).json({
    status: 'Created',
    code: 201,
    message: 'Register succes',
  })
}

module.exports = register
