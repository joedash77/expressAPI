const mongoose = require('mongoose');
const schema = mongoose.Schema;
///CREAR EL SCHEMA COMO AGREGAR LOS ELEMENTOS DE LA CONEXION COMO BUSCAR ELEMENTOS DE LA CONEXION
const taskSchema = new schema({
  id: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String
  },
  done: {
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model('tasks', taskSchema);