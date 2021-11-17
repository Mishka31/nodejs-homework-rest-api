const express = require('express')
const { listContacts } = require('../../model/index')
const router = express.Router()

router.get('/', async (req, res, next) => {
  return listContacts().then(s => res.json({s, message: 'template message' }))
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
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
