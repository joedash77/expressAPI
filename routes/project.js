const express = require('express');
const projectController = require('../controller/project');
const { checkToken } = require('../controller/auth');
const { getEpicsFromProject } = require('../controller/epic');
const router = express.Router();

router.post('/', checkToken, projectController.createProject);

router.get('/user/:userID', checkToken, projectController.getAllProjects);

router.get('/:id', checkToken, projectController.getProjectById);

router.get('/:id/epics', checkToken, getEpicsFromProject);

router.delete('/:id', checkToken, projectController.deleteProject);

router.put('/:id', checkToken, projectController.updateProject);

module.exports = router;