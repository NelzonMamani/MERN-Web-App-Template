const express = require('express')
const router = express.Router()
const { projects } = require('../data')

router.get('/', (req, res) => {
  res.json(projects)
})

router.get('/:projectId', setProject, (req, res) => {
  res.json(req.project)
})


// middleware function 
function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId)
  // gives back NOT id but the whole project object of that id
  req.project = projects.find(project => project.id === projectId)
  
  if (req.project == null) {
    res.status(404)
    return res.send('404 Not Found, Project not found')
  }
  next()
}

module.exports = router