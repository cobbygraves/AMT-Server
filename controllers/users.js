const { UserModel } = require('../models/users.js')
const bcrypt = require('bcryptjs')
const { signJWTAccessToken } = require('../utils/apiAuthorization.js')
const { v4: uuidv4 } = require('uuid')

function compareBcryptAsync(param1, param2) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(param1, param2, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

const login = async (req, res) => {
  const user = req.body

  const userData = await UserModel.findOne({ email: user.username })

  if (
    userData &&
    (await compareBcryptAsync(user.password, userData.password))
  ) {
    const { password, ...userInfo } = userData
    const accessToken = signJWTAccessToken(userInfo)
    const { password: pwd, ...userDetails } = userInfo._doc
    return res.json({
      ...userDetails,
      accessToken
    })
  } else {
    res.status(400).json({
      error: 'Login Failed',
      message: 'Wrong username or password'
    })
  }
}

const register = async (req, res) => {
  const user = req.body
  const userData = await UserModel.findOne({ email: user.username })
  if (!userData) {
    const newUser = new UserModel({
      _id: uuidv4(),
      name: user.name,
      email: user.username,
      password: await bcrypt.hash(user.password, 10)
    })
    const resp = await newUser.save()

    return res.json({ _id: resp._id, name: resp.name, email: resp.email })
  } else {
    return res.status(401).json({ error: 'User Already Exist, Please Login' })
  }
}

module.exports = {
  login,
  register
}
