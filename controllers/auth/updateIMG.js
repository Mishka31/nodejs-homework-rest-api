const fs = require('fs/promises')
const path = require('path')
const { NotFound } = require('http-errors')
const { User } = require('../../model')
const moment = require('moment')
const date = moment().format('DD_MM_YYYY_hh-mm-ss')

const avatarDir = path.join(__dirname, '../../', 'public/avatars')

const updateImg = async (req, res) => {
  const { email, token } = req.user
  const file = req.file

  if (!file) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'wrong mime type of file',
    })
  }

  const { path: tmpUpload, originalname } = req.file

  try {
    const resoultUpload = path.join(avatarDir, `${date}_${originalname}`)

    await fs.rename(tmpUpload, resoultUpload)
    const avatarURL = path.join('/avatars', `${date}_${originalname}`)

    const result = await User.findOneAndUpdate(
      { token: token },
      {
        avatarURL,
      },
      { new: true }
    )

    if (!result) {
      throw new NotFound(`Not found this User ${email}`)
    }
    res.status(200).json({ status: 'succes', code: 200, data: { result } })
  } catch (error) {
    await fs.unlink(tmpUpload)
    throw error
  }
}

module.exports = updateImg
