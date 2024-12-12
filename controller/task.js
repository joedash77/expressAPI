const Task = require('../model/task');

module.exports.createTask = (req, res) => {
  let body = req.body;

  const task = new Task({
    name: body.name,
    description: body.description,
    story: body.story,
    created: body.created,
    dueDate: body.dueDate,
    done: body.done
  });

  task.save()
    .then((task) => {
      res.status(200).json({
        message: 'Task sucessfully created',
        data: task
      });
    }).catch((err) => {
      res.status(400).json({error: 'Error al crear la tarea: ' + err});
    });
}

module.exports.getAllTasks = (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json({
        status: 'success',
        data: tasks
      });
    }).catch((err) => {
      res.status(500).json({
        message: 'Error al obtener las tareas',
        error: err
      });
    });
}


module.exports.getTaskById = (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then((task) => {
      if(task){
        res.status(200).json(task);
      }else{
        res.status(404).json('Tarea no encontrada');
      }
    })
}

module.exports.deleteTask = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then((task) => {
      if(!task){
        return res.status(404).send('Tarea no encontrada');
      };
      res.status(200).json({
        status: 'success',
        message: 'Task ' + id + 'was deleted'
      });
    })
}

module.exports.getTasksFromStory = (req, res) => {
  Task.find({
    story: req.params.id
  })
    .then((tasks) => {
      return res.status(200).json({
        status: 'success',
        data: tasks
      })
    })
    .catch((err) => {
      return res.status(400).json({
        status: 'fail',
        data:err
      })
    })
}

module.exports.updateTask = (req,res) => {
  update = {};
  body = req.body;

  if(body.name){
    update.name = body.name;
  }
  if(body.description){
    update.description = body.description;
  }
  if(body.dueDate){
    update.dueDate = body.dueDate;
  }
  if (typeof body.done !== 'undefined') { 
    update.done = body.done; 
  }

Task.findByIdAndUpdate(req.params.id, update) 
.then((newTask) => { 
  if (!newTask) 
    { return res.status(404).json({
       status: 'fail', 
       message: 'Tarea no encontrada' 
      }); 
    } return res.status(200).json({
       status: 'success', 
       data: newTask }); 
      }) 
      .catch((err) => {
         return res.status(500).json({
           status: 'fail', 
           message: 'Error al modificar la tarea', 
           error: err.message 
          });
      });
}