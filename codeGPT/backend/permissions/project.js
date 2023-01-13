const {
  ROLE
} = require('../data')

function canViewProject(user, project) {
  return (
    // if user is an admin OR if user is part of that project   
    user.role === ROLE.ADMIN ||
    project.userId === user.id
  )
}

// for users to have access only to their projects
function scopedProjects(user, projects) {
  if (user.role === ROLE.ADMIN) {
    return projects
  }
  return projects.filter(project => project.userId === user.id)
}

function canDeleteProject(user, project) {
  // you can only delete the project that you created. 
  return project.userId === user.id

}

module.exports = {
  canViewProject,
  scopedProjects,
  canDeleteProject
}