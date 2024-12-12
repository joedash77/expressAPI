const Epic = require('../model/epic');
const Story = require('../model/story');

module.exports.createEpic = (req, res) => {
  let body = req.body;

  // Validaciones del body
  if (body == undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'body is missing',
    });
  } else if (body.name == undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'name is missing',
    });
  } else if (body.project == undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'No Project Id found',
    });
  }

  // Crear la épica
  const epic = new Epic({
    name: body.name,
    description: body.description,
    project: body.project, // Cambiado 'epic' a 'project'
    icon: body.icon,
  });

  // Guardar la épica
  epic.save()
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'fail',
        message: err.message, // Mejor devolver solo el mensaje del error
      });
    });
};

module.exports.getAllEpics = (req, res) => {
  const userID = req.params.userID;

  if(!userID){
    return res.status(400).json({
        status: 'fail',
        message: 'User ID is required'
    })
 }

    Epic.find(userID)
      .then((epics) => {
        res.status(200).json({
          status: 'success',
          data: epics
        });
      }).catch((err) => {
        res.status(500).json({
          status: 'Fail',
          error: err
        });
      });
}

module.exports.getEpicById = (req, res) => {
    const id = req.params.id;
    Epic.findById(id)
      .then((epic) => {
        return res.status(200).json({
            status: 'success',
            data: epic
        });
      })
      .catch((err) => {
        return res.status(500).json({
            status: 'fail',
            message: err
        })
      })
}

  module.exports.deleteEpic = async (req, res) => {
    const id = req.params.id;

    const story = await Story.findOne({epic: req.params.id});

    if(story){
        return res.status(400).json({
            status: 'fail',
            message: 'La historia contiene tareas...'
        })
    }
    else{
        Epic.findByIdAndDelete(id)
        .then((epic) => {
                return res.status(200).json({
                    status: 'success',
                    data: epic
                })
        })
        .catch((err) => {
            return res.status(500).json({
                status: 'fail',
                data: err
            })
        })
    }
}

module.exports.getEpicsFromProject = (req, res) => {
    Epic.find({
      project: req.params.id
    })
      .then((epics) => {
        return res.status(200).json({
          status: 'success',
          data: epics
        })
      })
      .catch((err) => {
        return res.status(400).json({
          status: 'fail',
          data:err
        })
      })
}

module.exports.updateEpic = (req,res) => {
    update = {};
    body = req.body;
  
    if(body.name){
      update.name = body.name;
    }
    if(body.description){
      update.description = body.description;
    }
  
    Epic.findByIdAndUpdate(req.params.id, update)
    .then((newEpic) => {
      if (!newEpic) {
        return res.status(400).json({
          status: 'fail',
          message: 'Épica no encontrada',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: newEpic,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'fail',
        message: 'Error al modificar la épica',
        error: err.message,
      });
    });
}