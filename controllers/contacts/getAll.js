const { Contact } = require('../../model')

const getAll = async (_, res) => {
  const contacts = await Contact.find({})
  res.json({ message: 'template message', code: 200, data: { contacts } })
}

module.exports = getAll
