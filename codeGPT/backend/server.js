require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt')
const {ROLE, users} = require('./data')
const {authUser, authRole} = require('./basicAuth')
const projectRouter = require('./routes/projects')
const app = express();

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(client => {
//     console.log('Connected to MongoDB Atlas!');
// })
// .catch(err => {
//     console.log('Error connecting to MongoDB Atlas!', err);
// })

// MIDLEWARES
app.use(express.json()) // to pull data from POST requests
app.use(setUser) // setting up a user
app.use('projects', projectRouter) // projectRouter is dedicated to path projects

// const users = []

app.get('/users', (req, res) => {
    res.json(users)
})
app.post('/users', async (req, res) => {
    try {
        // const saltRounds = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // console.log(saltRounds) // salt
        // console.log(hashedPassword); // hashedPassword contains salt
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user)
    } catch (error) {
        res.status(500).send({
            message: 'oops'
        })
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        //return res.status(400).send('400 Bad Request. Can not find user')
        return res.status(400).json({
            message: '400 Bad Request. Can not find user'
        })
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.status(403).send('403 Forbidden, not allowed')
        }
    } catch (error) {
        res.status(500).send('500 Internal Server Error')
    }
})

app.get('/', (req, res) => {
    res.send('Home Page')
})



// Adding a middleware authUser to this route
// Only users that are authenticated can have access to this page
app.get('/dashboard', authUser, (req, res) => {
    res.send('Dasboard Page')
})


// we want only admins to have access to this page
// authUser then authenticate that user has a role of admin
app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin Page')
})




// middleware function
function setUser(req, res, next) {
    // inside req.body we are passing up a userId
    const userId = req.body.userId
    if (userId) {
        //setting the user with that id passed from the req.body.userId
        req.user = users.find(user => user.id === userId)
        //console.log(req.user);
    }
    next()
}




const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
    console.log(`Backend Web Server is listening for requests on port ${PORT}`);
});