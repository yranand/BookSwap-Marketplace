const bookService = require("../services/book.service");

async function createBook(req, res, next) {
  try {
    const book = await bookService.createBook({
      ownerId: req.user.id,
      ...req.body,
      imageFile: req.file,
    });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

async function listBooks(req, res, next) {
  try {
    res.json(await bookService.listBooks());
  } catch (err) {
    next(err);
  }
}

async function listMyBooks(req, res, next) {
  try {
    res.json(await bookService.listMyBooks(req.user.id));
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    const book = await bookService.updateBook(
      req.params.id,
      req.user.id,
      req.body,
      req.file
    );
    res.json(book);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    res.json(await bookService.deleteBook(req.params.id, req.user.id));
  } catch (err) {
    next(err);
  }
}

module.exports = { createBook, listBooks, listMyBooks, updateBook, deleteBook };
