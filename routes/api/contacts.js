const express = require('express')
const { ctrl } = require('../../controllers')
const { validation, asyncTryCatch } = require('../../middleware')
const { schema, schemaFavorite } = require('../../model/contact')
const router = express.Router()

router.get('/', asyncTryCatch(ctrl.getAll))

router.get('/:contactId', asyncTryCatch(ctrl.getById))

router.post('/', validation(schema), asyncTryCatch(ctrl.addContacts))

router.put('/:contactId', validation(schema), asyncTryCatch(ctrl.updateById))

router.patch(
  '/:contactId/favorite',
  validation(schemaFavorite),
  asyncTryCatch(ctrl.updateFavorite)
)

router.delete('/:contactId', asyncTryCatch(ctrl.deleteById))

module.exports = router
