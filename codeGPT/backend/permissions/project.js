const {ROLE} = require('../data')

function canViewProject(user, project) {
  return (
    // if user is an admin OR if user is part of that project   
     user.role === ROLE.ADMIN ||
     project.userId === user.id 
  )
}
module.exports = {
    canViewProject
}
