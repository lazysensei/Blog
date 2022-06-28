const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

// Register user
// POST api/user
const registerUser = asyncHandler ( async (req, res) =>{

    const { username, email, password, image} = req.body
    
    if (!username || !email || !password || !image) {
      res.status(400)
      throw new Error('Please add all fields')
    }    

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        image,
    })

    if (user) {
        res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
        token: generateToken(user._id),
        })
    } 
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }    
})

// Login user
// POST api/user/login
const loginUser = asyncHandler ( async (req, res) =>{
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400)
      throw new Error('Please add all fields xx')
    }   
    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
        token: generateToken(user._id),  
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
})

// Get user
// Get api/user/me
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.body)
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUser,
}