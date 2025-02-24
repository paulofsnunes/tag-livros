const db = require('./utils/db');
const express = require('express');
const bodyParser = require('body-parser');
const livrosRoutes = require('./routes/livrosRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', livrosRoutes);

app.get('/', (req, res) => {
  res.send('API TAG Livros');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});