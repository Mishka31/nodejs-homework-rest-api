const express = require('express')
const router = express.Router()
const {
  validation,
  asyncTryCatch,
  authenticate,
  uploadAvatars,
} = require('../../middleware')
const { ctrlAuth: ctrl } = require('../../controllers')
const { schemaJoi } = require('../../model/user')

router.post('/register', validation(schemaJoi), asyncTryCatch(ctrl.register))
router.post('/login', validation(schemaJoi), asyncTryCatch(ctrl.login))
router.get('/logout', authenticate, asyncTryCatch(ctrl.logout))
router.patch(
  '/avatars',
  authenticate,
  uploadAvatars.single('image'),
  asyncTryCatch(ctrl.updateImg)
)

module.exports = router
