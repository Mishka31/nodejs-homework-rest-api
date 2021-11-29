const { NotFound, Unauthorized, BadRequest } = require('http-errors')
const { User } = require('../../model')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Wrong email or Password')
  }

  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  res.json({
    status: 'succes',
    cose: 200,
    data: {
      token,
    },
  })

  //   if (!user) {
  //     throw new NotFound(`User with email=${email} not found`)
  //   }
  //   const compareResult = bcrypt.compareSync(password, user.password)
  //   if (!compareResult) {
  //     throw new Unauthorized('Wrong Password')
  //   }
}

module.exports = login
