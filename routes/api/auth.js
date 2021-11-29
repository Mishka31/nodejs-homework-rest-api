const express = require('express')
const router = express.Router()
const { validation, asyncTryCatch } = require('../../middleware')
const { ctrlAuth: ctrl } = require('../../controllers')

router.post('/register', asyncTryCatch(ctrl.register))

module.exports = router
