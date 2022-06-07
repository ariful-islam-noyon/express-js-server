const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const {authCheck} = require('./middleware/auth')


// environment variavble init
const PORT = process.env.SERVER_PORT

// Request Body init
app.use(express.json());
app.use(express.urlencoded({extended : false}))

// auth middleware
app.use(authCheck)

// middleware use path system
// app.get('/arif', authCheck, (req, res, next) => {
//     console.log('Router Is Ok');
//     next()
// })


// Student Route Use
app.use('/api/students', require('./routes/students'))

// Add express server listener with port
app.listen(PORT, () => console.log(`Our Server is running on port ${PORT}`))
