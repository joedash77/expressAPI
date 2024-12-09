const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv').config();
const port = process.env.PORT;

const { login } = require('./controller/auth');
const user = require('./routes/user');
const project = require('./controller/project');
const epic = require('./controller/epic');
const story = require('./controller/story');
const tasksRoutes = require('./routes/taskRouter');

const cors = require('cors');

mongoose.connect(process.env.MONGOCONEXION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado a mongoDB");
  app.listen(port, () => {
    console.log('Servidor corriendo');
  });
})
.catch((err) => {
  console.error("Error al conectar con el sevidor MongoDB: ", err);
})


app.use(cors());
app.use(express.json());
app.post('/login', login);
app.use('/users', user);
app.use('/projects', project);
app.use('/epics', epic);
app.use('/stories', story);
app.use('/tasks', tasksRoutes);
