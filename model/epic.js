const mongoose = require('mongoose');
const schema = mongoose.Schema;
const project = require('./project');

const epic = new schema({
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: project,
        required: true,
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: false
      },
      icon: {
        type: String,
        required: false
      }
});

module.exports = mongoose.model('Epic', epic);