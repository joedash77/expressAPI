const Story = require('../model/story');
const Task = require('../model/task');

module.exports.createStory = (req, res) => {
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
    else if(body.epic==undefined){
        return res.status(400).json({
            status: 'fail',
            message: 'No Epic Id found'
        })
    }

    const story = new Story({
        name: body.name,
        description: body.description,
        epic: body.epic,
        owner: body.owner,
        assignedTo: body.assignedTo,
        points: body.points,
        created: body.create,
        due: body.due,
        started: body.started,
        finished: body.finished,
        status: body.status,
        icon: body.icon
    })

    story.save()
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

module.exports.getAllStories = (req, res) => {
    Story.find({
        owner: req.params.userId
    })
      .then((stories) => {
        res.status(200).json({
          status: 'success',
          data: stories
        });
      }).catch((err) => {
        res.status(500).json({
          status: 'fail',
          error: err
        });
      });
  }

  module.exports.getStoryById = (req, res) => {
    const id = req.params.id;
    Story.findById(id)
      .then((story) => {
        return res.status(200).json({
            status: 'success',
            data: story
        });
      })
      .catch((err) => {
        return res.status(500).json({
            status: 'fail',
            message: err
        })
      })
  }

  module.exports.deleteStory = async (req, res) => {
    const id = req.params.id;

    const task = await Task.findOne({story: req.params.id});

    if(task){
        return res.status(400).json({
            status: 'fail',
            message: 'La historia contiene tareas...'
        })
    }
    else{
        Story.findByIdAndDelete(id)
        .then((story) => {
                return res.status(200).json({
                    status: 'success',
                    data: story
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

  module.exports.getStoriesFromEpic = (req, res) => {
    Story.find({
      epic: req.params.id
    })
      .then((stories) => {
        return res.status(200).json({
          status: 'success', // Se debe poner 'success' como string
          data: stories
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: 'fail',
          data: err
        });
      });
  }

  module.exports.updateStory = (req, res) => {
    let update = {};
    const body = req.body;
  
    if (body.name) {
      update.name = body.name;
    }
    if (body.description) {
      update.description = body.description;
    }
  
    Story.findByIdAndUpdate(req.params.id, update, { new: true })
      .then((newStory) => {
        if (!newStory) {
          return res.status(400).json({
            status: 'fail',
            message: 'Historia no encontrada'
          });
        }
        return res.status(200).json({
          status: 'success',
          data: newStory
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 'fail',
          message: 'Error al modificar la historia',
          error: err.message
        });
      });
  };  