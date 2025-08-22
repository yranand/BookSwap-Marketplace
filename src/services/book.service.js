const path = require("path");
const { Book } = require("../models");

async function createBook({ ownerId, title, author, condition, imageFile }) {
  const imageUrl = imageFile
    ? path.posix.join("uploads", path.basename(imageFile.path))
    : null;
  const book = await Book.create({
    ownerId,
    title,
    author,
    condition,
    imageUrl,
  });
  return book.toJSON();
}

async function listBooks() {
  return Book.findAll({ order: [["createdAt", "DESC"]] });
}

async function listMyBooks(ownerId) {
  return Book.findAll({ where: { ownerId }, order: [["createdAt", "DESC"]] });
}

async function updateBook(id, ownerId, data, imageFile) {
  const book = await Book.findByPk(id);
  if (!book) throw Object.assign(new Error("Book not found"), { status: 404 });
  if (book.ownerId !== ownerId)
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  if (imageFile)
    data.imageUrl = path.posix.join("uploads", path.basename(imageFile.path));
  await book.update(data);
  return book.toJSON();
}

async function deleteBook(id, ownerId) {
  const book = await Book.findByPk(id);
  if (!book) throw Object.assign(new Error("Book not found"), { status: 404 });
  if (book.ownerId !== ownerId)
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  await book.destroy();
  return { success: true };
}

module.exports = { createBook, listBooks, listMyBooks, updateBook, deleteBook };
