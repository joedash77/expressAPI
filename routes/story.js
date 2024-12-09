const express = require('express');
const storyController = require('../controller/story');
const { checkToken } = require('../controller/auth');
const { getTasksfromStory } = require('../controller/task');

const router = express.Router();

router.post('/', checkToken, storyController.createStory);

router.get('/user/:userID', checkToken, storyController.getAllStories);

router.get('/:id', checkToken, storyController.getStoryById);

router.get('/:id/tasks', checkToken, getTasksfromStory);

router.delete('/:id', checkToken, storyController.deleteStory);

router.put('/:id', checkToken, storyController.updateStory);

module.exports = router;