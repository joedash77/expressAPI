const Project = require('../model/project');
const Epic = require('../model/epic');

module.exports.createProject = (req, res) => {
    let body = req.body;

    if(body == undefined){
        return res.status(400).json({
            status: 'fail',
            message: 'body is missing'
        })
    }
    else if(body.name==undefined){
        return res.status(400).json({
            status: 'fail',
            message: 'name is missing'
        })
    }
    else if(body.members==undefined){
        return res.status(400).json({
            status: 'fail',
            message: 'Members is missing'
        })
    }

    const project = new Project({
        name: body.name,
        description: body.description,
        members: body.members,
        icon: body.icon
    })

    project.save()
    .then((data) => {
        res.status(200).json({
            status: 'success',
            data: data
        });
    })
    .catch((err) => {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    })
}

module.exports.getAllProjects = (req, res) => {
    const userID = req.params.userID;

    if(!userID){
        return res.status(400).json({
            status: 'fail',
            message: 'User ID is required'
        })
    }

    Project.find({
        members: userID
    })
      .then((projects) => {
        res.status(200).json({
          status: 'success',
          data: projects
        });
      }).catch((err) => {
        res.status(500).json({
          status: 'Fail',
          error: err
        });
      });
}

module.exports.getProjectById = (req, res) => {
    const id = req.params.id;
    Project.findById(id)
      .then((project) => {
        return res.status(200).json({
            status: 'success',
            data: project
        });
      })
      .catch((err) => {
        return res.status(500).json({
            status: 'fail',
            message: err
        })
      })
}

module.exports.deleteProject = async (req, res) => {
    const id = req.params.id;

    const epic = await Epic.findOne({project: req.params.id});

    if(epic){
        return res.status(400).json({
            status: 'fail',
            message: 'La epica contiene tareas...'
        })
    }
    else{
        Project.findByIdAndDelete(id)
        .then((project) => {
                return res.status(200).json({
                    status: 'success',
                    data: project
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

module.exports.updateProject = async (req, res) => {
  try {
    const body = req.body; // Datos enviados en la solicitud
    const update = {};

    // Verifica y actualiza los campos permitidos
    if (body.name) {
      update.name = body.name;
    }
    if (body.description) {
      update.description = body.description;
    }

    // Actualiza el proyecto por ID
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, // ID del proyecto
      update, // Campos a actualizar
      { new: true, runValidators: true } // Opciones: devuelve el nuevo documento y aplica validaciones del esquema
    );

    if (!updatedProject) {
      return res.status(404).json({
        status: 'fail',
        message: 'Proyecto no encontrado',
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      status: 'success',
      data: updatedProject,
    });
  } catch (err) {
    // Manejo de errores
    return res.status(500).json({
      status: 'fail',
      message: 'Error al modificar el proyecto',
      error: err.message,
    });
  }
};