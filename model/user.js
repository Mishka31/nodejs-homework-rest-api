const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const schemaJoi = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  schemaJoi,
}