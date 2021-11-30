const { Conflict } = require('http-errors')
const { User } = require('../../model')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with email=${email} already exist`)
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({
    status: 'Created',
    code: 201,
    message: 'Register succes',
  })
}

module.exports = register
