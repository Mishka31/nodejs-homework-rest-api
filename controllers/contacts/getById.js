const { NotFound } = require('http-errors')
const { Contact } = require('../../model')

const getById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId)
  if (!result) {
    throw new NotFound(`Not found id = ${contactId}`)
  }
  res.json({ message: 'template message', code: 200, data: { result } })
}
module.exports = getById
