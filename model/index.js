const fs = require('fs/promises')
const path = require('path')
// const asd = require('./contacts.json')
const contactsPath = path.join(__dirname, './', 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath)
  const contacts = await JSON.parse(data)
  const [contact] = await contacts.filter((it) => it.id === Number(contactId))
  return contact
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  const newContact = { id: Number(contacts.length + 1), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  const contacts = await listContacts()
  const contact = []
  contacts.forEach((post) => {
    if (post.id === Number(contactId)) {
      post.name = name
      post.email = email
      post.phone = phone
      contact.push(post)
    }
  })
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const delContact = contacts.filter((it) => it.id === Number(contactId))
  console.log(delContact)
  const newContacts = contacts.filter((it) => it.id !== Number(contactId))
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
  return delContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
