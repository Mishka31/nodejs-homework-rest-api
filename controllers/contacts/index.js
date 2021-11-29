const getAll = require('./getAll')
const getById = require('./getById')
const addContacts = require('./add')
const updateById = require('./updateById')
const deleteById = require('./deleteById')
const updateFavorite = require('./updateFavorite')

module.exports = {
  getAll,
  updateFavorite,
  getById,
  deleteById,
  addContacts,
  updateById,
}
