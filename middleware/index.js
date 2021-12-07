const validation = require('./validation')
const asyncTryCatch = require('./controllerWrapper')
const authenticate = require('./authenticate')
const uploadAvatars = require('./upload')

module.exports = {
  validation,
  asyncTryCatch,
  authenticate,
  uploadAvatars,
}
