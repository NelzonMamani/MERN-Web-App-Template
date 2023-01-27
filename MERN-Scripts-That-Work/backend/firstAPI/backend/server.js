//require("dotenv").config()
//NODE_ENV is a system environment variable
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    const result = dotenv.config()

    if (result.error) {
        throw result.error
    }
    console.log(result.parsed)
    console.log(process.env.NODE_ENV)
}
 
const express = require("express")  
const mongoose = require('mongoose')
const app = express()  
const workoutRouters = require("./routes/workouts")  


// This global middleware function fires for every request that comes in.
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next() // always to get to the next function or middleware
})

app.use(express.json()) // to access req and res objects

// middleware routes for API end points
app.use('/api/workouts', workoutRouters)

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to HOME PAGE"
    })
})

// connect to Database. It is asynchronous and therefore returns a promise
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT || 4001
       
        app.listen(PORT, () => {
            console.log(`connected to DB and backend express web server running on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
 