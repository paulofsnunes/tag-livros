const db = require('../utils/db');
const Livro = require('../models/Livro');

const criarLivro = (req, res) => {
  try {
    const { titulo, isbn, numeroPaginas, autores, editora, sinopse, dataLancamento } = req.body;

    const livro = new Livro(titulo, isbn, numeroPaginas, autores, editora, sinopse, dataLancamento);
    livro.validate();

    const query = `
      INSERT INTO livros (titulo, isbn, numero_paginas, autores, editora, sinopse, data_lancamento)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [titulo, isbn, numeroPaginas, JSON.stringify(autores), editora, sinopse, dataLancamento];

    db.run(query, values, function (err) {
      if (err) {
        console.error('Erro ao criar livro:', err.message);
        return res.status(500).json({ error: 'Erro ao criar livro' });
      }
      res.status(201).json({ id: this.lastID, ...req.body });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarLivros = (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const skip = 5;

  const offset = page === 1 ? 0 : (page - 1) * skip;

  const query = `
    SELECT * FROM livros
    ORDER BY created_at ASC
    LIMIT ? OFFSET ?
  `;
  const values = [limit, offset];

  db.all(query, values, (err, rows) => {
    if (err) {
      console.error('Erro ao listar livros:', err.message);
      return res.status(500).json({ error: 'Erro ao listar livros' });
    }
    res.json(rows);
  });
};

module.exports = {
  criarLivro,
  listarLivros,
};