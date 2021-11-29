const { NotFound } = require('http-errors')
const { Contact } = require('../../model')

const deleteById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    throw new NotFound(`Not found id = ${contactId}`)
  }
  res.json({ status: 'succes', code: 200, message: 'contact deleted' })
}

module.exports = deleteById
