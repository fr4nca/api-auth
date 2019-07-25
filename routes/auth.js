const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const auth = require('../middleware/auth')

const User = require('../models/User')

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server error')
  }
})

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please, include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })

      if (!user) return res.status(400).json({ msg: 'Invalid credentials' })

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) return res.status(400).json({ msg: 'Password incorrect' })

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwt_secret'),
        {
          expiresIn: 3600000
        },
        (e, token) => {
          if (e) throw e
          return res.json({ token })
        }
      )
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
