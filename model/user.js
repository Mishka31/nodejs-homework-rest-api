const { Schema, model } = require('mongoose')
const Joi = require('joi')

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

const schemaJoi = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  schemaJoi,
}
