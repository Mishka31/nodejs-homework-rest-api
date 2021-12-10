const { BadRequest } = require('http-errors')
const { User } = require('../../model')
require('dotenv').config()
const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new BadRequest('Wrong email or Password')
  }

  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'succes',
    cose: 200,
    data: {
      token,
    },
  })
}

module.exports = login
