const express = require('express');
const router = express.Router();
const tasks = require('../data/MOCK_DATA.json');
const taskController = require('../controller/task');

///EL ROUTER DERIVA LAS RUTAS Y LAS MANDA A UN CONTROLADOR QUE SE ENCARGA DE CREAR EL DOCUMENTO



router.get('/', taskController.getAllTasks);

router.get('/:id', (req, res) => {
  const tarea = tasks.find((task) => {
    return task.id == req.params.id;
  }
  );
  res.status(200).send(tarea);
});

router.post('/', taskController.createTask);

router.put('/:id', (req, res) => {
  // Modificar la tarea identificada con id...
  const body = req.body;
  tasks.map((t) => {
    if (t.id == req.params.id) {
      t.description = body.description;
    }
  });
});

router.delete('/:id', (req, res) => {
  // Eliminar la tarea identificada con id..
  const index = tasks.findIndex((task) => task.id == req.params.id);
  tasks.splice(index, 1);
  res.status(200).json(tasks);
});

module.exports = router;