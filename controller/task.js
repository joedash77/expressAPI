const Task = require('../model/task');

module.exports.createTask = (req, res) => {
  let body = req.body;
  const task = new Task({
    id: body.id,
    start: body.start,
    description: body.description,
    status: body.status,
    done: body.done
  });

  task.save()
    .then((task) => {
      res.status(200).json({
        message: 'Tarea creada con éxito',
        task: task
      });
    }).catch((err) => {
      res.status(400).json({
        message: 'Error al crear la tarea',
        error: err
      });
    });
}
module.exports.getAllTasks = (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json({
        tasks: tasks,
        message: 'Tareas obtenidas con éxito'
      });
    }).catch((err) => {
      res.status(400).json({
        message: 'Error al obtener las tareas',
        error: err
      });
    });
}




//EL CONTROLLER TE CREA UN DOCUMENTO QUE LE MANDASTE EN EL MODELO,
//module.exports.getTasks = (req, res) => {
//  

/// put