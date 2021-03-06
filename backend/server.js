const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors');

connectDB()
const app = express()
app.use(express.json())	
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
app.use('/api/item', require('./routes/itemRoutes'))
app.use('/api/comment', require('./routes/commentRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port,()=> console.log(`Server started on port ${port}`))