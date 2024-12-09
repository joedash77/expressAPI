const mongoose = require('mongoose');
const user = require('./user');
const schema = mongoose.Schema;

const project = new schema({
    name: {
        type: String,
        required: true
      },
      members: [{
        type: schema.Types.ObjectId,
        ref: user,
        required: true
      }],
      description: {
        type: String,
        required: false
      },
      icon: {
        type: String,
          required: false
      }
});

module.exports = mongoose.model('Project', project);