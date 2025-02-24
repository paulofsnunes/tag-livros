const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');

router.post('/livros', livrosController.criarLivro);
router.get('/livros', livrosController.listarLivros);

module.exports = router;