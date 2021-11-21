/* eslint-disable new-cap */
const { NotFound } = require('http-errors')
const express = require('express')
const { listContacts, getContactById } = require('../../model/index')
const router = express.Router()

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
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template mesijsage' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
