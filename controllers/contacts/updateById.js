const { NotFound } = require('http-errors')
const { Contact } = require('../../model')

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body)
  if (!result) {
    throw new NotFound(`Not found id = ${contactId}`)
  }
  res.status(200).json({ status: 'succes', code: 200, data: { result } })
}

module.exports = updateById
