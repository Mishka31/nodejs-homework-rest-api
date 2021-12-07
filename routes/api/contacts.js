const express = require('express')
const { ctrl } = require('../../controllers')
const { validation, authenticate, asyncTryCatch } = require('../../middleware')
const { schema, schemaFavorite } = require('../../model/contact')
const router = express.Router()

router.get('/', authenticate, asyncTryCatch(ctrl.getAll))

router.get('/:contactId', authenticate, asyncTryCatch(ctrl.getById))

router.post(
  '/',
  authenticate,
  validation(schema),
  asyncTryCatch(ctrl.addContacts)
)

router.put(
  '/:contactId',
  authenticate,
  validation(schema),
  asyncTryCatch(ctrl.updateById)
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(schemaFavorite),
  asyncTryCatch(ctrl.updateFavorite)
)

router.delete('/:contactId', authenticate, asyncTryCatch(ctrl.deleteById))

module.exports = router
