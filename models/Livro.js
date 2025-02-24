class Livro {
  constructor(titulo, isbn, numeroPaginas, autores, editora, sinopse, dataLancamento) {
    this.titulo = titulo;
    this.isbn = isbn;
    this.numeroPaginas = numeroPaginas;
    this.autores = autores;
    this.editora = editora || null;
    this.sinopse = sinopse || null;
    this.dataLancamento = dataLancamento || null;
  }

  validate() {
    const camposObrigatorios = [];
    if (!this.titulo) camposObrigatorios.push('titulo');
    if (!this.isbn) camposObrigatorios.push('isbn');
    if (!this.numeroPaginas) camposObrigatorios.push('numeroPaginas');
    if (!this.autores) camposObrigatorios.push('autores');

    if (camposObrigatorios.length > 0) {
      throw new Error(`Campos obrigatórios faltando: ${camposObrigatorios.join(', ')}`);
    }

    if (this.dataLancamento && new Date(this.dataLancamento).getFullYear() < 2000) {
      throw new Error('Data de lançamento não pode ser anterior a 2000');
    }

  }
}

module.exports = Livro;