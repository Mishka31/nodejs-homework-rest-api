const fs = require('fs/promises')
const path = require('path')
// const asd = require('./contacts.json')
const contactsPath = path.join(__dirname, './', 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  // console.log(asd)
  return contacts
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath)
  const contacts = await JSON.parse(data)
  const [contact] = await contacts.filter(it => it.id === Number(contactId))
  return contact
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
