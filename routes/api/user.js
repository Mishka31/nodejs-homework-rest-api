const express = require('express')
const router = express.Router()
const { validation, asyncTryCatch, authenticate } = require('../../middleware')
const { ctrlAuth: ctrl } = require('../../controllers')
const { schemaJoi } = require('../../model/user')

router.post('/register', validation(schemaJoi), asyncTryCatch(ctrl.register))
router.post('/login', validation(schemaJoi), asyncTryCatch(ctrl.login))
router.get('/logout', authenticate, asyncTryCatch(ctrl.logout))

module.exports = router
