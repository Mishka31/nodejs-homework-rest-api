const { NotFound, BadRequest } = require('http-errors')
const express = require('express')
const Joi = require('joi')
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../model/index')
const router = express.Router()

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().min(12).max(14).required(),
})

router.get('/', async (_, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({ message: 'template message', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await getContactById(contactId)
    if (!result) {
      throw new NotFound(`Not found id = ${contactId}`)
    }
    res.json({ message: 'template message', code: 200, data: { result } })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body)
    if (error) {
      throw new BadRequest('missing required name field')
    }
    const result = await addContact(req.body)
    res.status(201).json({ status: 'succes', code: 201, data: { result } })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body)
    if (error) {
      throw new BadRequest('missing fields')
    }
    const { contactId } = req.params
    const [result] = await updateContact(contactId, req.body)
    if (!result) {
      throw new NotFound(`Not found id = ${contactId}`)
    }
    res.status(200).json({ status: 'succes', code: 200, data: { result } })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const [result] = await removeContact(contactId)
    if (!result) {
      throw new NotFound(`Not found id = ${contactId}`)
    }
    res.json({ status: 'succes', code: 200, message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
