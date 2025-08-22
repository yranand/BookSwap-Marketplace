const { Book, BookRequest } = require("../models");

async function createRequest({ requesterId, bookId }) {
  const book = await Book.findByPk(bookId);
  if (!book) throw Object.assign(new Error("Book not found"), { status: 404 });
  if (book.ownerId === requesterId)
    throw Object.assign(new Error("Cannot request own book"), { status: 400 });
  const existing = await BookRequest.findOne({
    where: { requesterId, bookId, status: "pending" },
  });
  if (existing)
    throw Object.assign(new Error("Request already pending"), { status: 409 });
  const req = await BookRequest.create({
    requesterId,
    bookId,
    status: "pending",
  });
  return req.toJSON();
}

async function listMyRequests(requesterId) {
  return BookRequest.findAll({
    where: { requesterId },
    order: [["createdAt", "DESC"]],
  });
}

async function updateStatus(id, ownerId, status) {
  if (!["accepted", "declined"].includes(status))
    throw Object.assign(new Error("Invalid status"), { status: 400 });
  const req = await BookRequest.findByPk(id, {
    include: [{ model: Book, as: "book" }],
  });
  if (!req)
    throw Object.assign(new Error("Request not found"), { status: 404 });
  if (req.book.ownerId !== ownerId)
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  await req.update({ status });
  return req.toJSON();
}

module.exports = { createRequest, listMyRequests, updateStatus };
