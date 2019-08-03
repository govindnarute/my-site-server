const router = require('express').Router()
const User = require('../model/Register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validate = require('./validate')

router.post('/register', async (req, res) => {
  const user = await User.find({ email: req.body.email })

  if (user.length) {
    return res.json({
      message: 'User already register.',
      success: false
    })
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(req.body.password, salt)
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    user_type: req.body.user_type == undefined ? 'user' : req.body.user_type,
    society: req.body.society
  })
  try {
    const usertest = await newUser.save()
    res.json({
      message: 'User successfully register',
      user: usertest,
      success: true
    })
  } catch (error) {
    return res.json({
      error: error,
      success: false
    })
  }
})

router.post('/login', async (req, res) => {
  const obj = {
    email: req.body.email,
    password: req.body.password
  }
  console.log(obj)

  const user = await User.findOne({ email: req.body.email })
  console.log(user)
  if (!user) {
    return res.json({
      success: false,
      message: 'User not  register.'
    })
  }
  const isValidUser = await bcrypt.compare(req.body.password, user.password)
  if (!isValidUser) {
    return res.json({
      success: false,
      message: 'Invalid password or username.'
    })
  }
  const token = await jwt.sign({ _id: user._id }, 'govindnarute')
  res.json({
    message: 'Login success.',
    success: true,
    user: user,
    token: token
  })
})

router.get('/users', async (req, res) => {
  const users = await User.find()
  res.json({
    success: true,
    users: users
  })
})

module.exports = router
