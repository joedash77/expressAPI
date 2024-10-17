const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const puerto = process.env.PORT || 3003;

const tasksRoutes = require('./routes/task.router');

app.use("/tasks", tasksRoutes);

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.listen(puerto, (err, res) => {
  mongoose.connect(process.env.MONGOCONEXION);
});