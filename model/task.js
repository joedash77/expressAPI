const mongoose = require('mongoose');
const Story = require('./story');
const schema = mongoose.Schema;
///CREAR EL SCHEMA COMO AGREGAR LOS ELEMENTOS DE LA CONEXION COMO BUSCAR ELEMENTOS DE LA CONEXION
const taskSchema = new schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  story: {
    type: schema.Types.ObjectId,
    ref: Story,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: false
  },
  dueDate: {
    type: Date,
    required: false
  },
  done: {
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model('Task', taskSchema);