const Joi = require("joi");

const createRequestSchema = Joi.object({
  params: Joi.object().optional(),
  query: Joi.object().optional(),
  body: Joi.object({
    bookId: Joi.string().required(),
  }),
});

module.exports = { createRequestSchema };
