const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o arquivo do banco de dados
const db = new sqlite3.Database('./data/tag_livros.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err.message);
  } else {
    console.log('Conectado ao SQLite com sucesso!');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      isbn TEXT NOT NULL UNIQUE,
      numero_paginas INTEGER NOT NULL,
      autores TEXT NOT NULL,
      editora TEXT,
      sinopse TEXT,
      data_lancamento TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela livros:', err.message);
    } else {
      console.log('Tabela livros criada ou já existente.');
    }
  });
});

module.exports = db;