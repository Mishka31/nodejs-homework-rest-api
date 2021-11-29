const express = require('express')
const router = express.Router()
const { validation, asyncTryCatch } = require('../../middleware')
const { ctrlAuth: ctrl } = require('../../controllers')
const { schemaJoi } = require('../../model/user')

router.post('/register', validation(schemaJoi), asyncTryCatch(ctrl.register))
router.post('/login', validation(schemaJoi), asyncTryCatch(ctrl.login))

module.exports = router
