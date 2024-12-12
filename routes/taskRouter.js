const express = require('express');
const router = express.Router();
const taskController = require('../controller/task');

///EL ROUTER DERIVA LAS RUTAS Y LAS MANDA A UN CONTROLADOR QUE SE ENCARGA DE CREAR EL DOCUMENTO

router.post('/', taskController.createTask);

router.get('/user/:userID', taskController.getAllTasks);

router.get('/:id', taskController.getTaskById);

router.delete('/:id', taskController.deleteTask);

router.put('/:id', taskController.updateTask);

module.exports = router;