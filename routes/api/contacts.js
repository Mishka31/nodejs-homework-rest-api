const { NotFound, BadRequest } = require('http-errors')
const express = require('express')
const Joi = require('joi')
const { listContacts, getContactById, addContact } = require('../../model/index')
const router = express.Router()

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.number().min(10).max(10).required()
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

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template mesijsage' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
