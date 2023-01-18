
// middleware that takes in a user, if user exists then continue otherwise ask to loggin and send error msg
function authUser(req, res, next) {
    // if null, we don't have a user
    if (req.user == null) {
        res.status(403)
        return res.send('403 Forbidden, you need to sign in')
    }
    next() // to continue to the next piece of middleware
}

function authRole(role) {
    return (req, res, next) => { 
        if(req.user.role !== role){
            res.status(401)
            return res.send('401 Unauthorized. You must authenticate first ')
        }
        next()
     }      
     
}


module.exports = {
    authUser,
    authRole
}