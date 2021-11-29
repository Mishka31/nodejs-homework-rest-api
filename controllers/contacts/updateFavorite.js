const { Contact } = require('../../model')

const updateFavorite = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )

  if (!result || favorite === undefined) {
    res.status(400).json({ message: 'missing field favorite' })
  }

  res.status(200).json({ status: 'succes', code: 200, data: { result } })
}

module.exports = updateFavorite
