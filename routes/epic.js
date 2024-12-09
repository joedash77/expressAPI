const express = require('express');
const epicController = require('../controller/epic');
const { checkToken } = require('../controller/auth');
const { getStoriesfromEpic } = require('../controller/story');
const router = express.Router();

router.post('/', checkToken, epicController.createEpic);

router.get('/:id', checkToken, epicController.getAllEpics);

router.get('/:id', checkToken, epicController.getEpicById);

router.get('/:id/stories', checkToken, getStoriesfromEpic);

router.delete('/:id', checkToken, epicController.deleteStory);

router.put('/:id', checkToken, epicController.updateEpic);

module.exports = router;