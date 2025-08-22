const Joi = require("joi");

const createBookSchema = Joi.object({
  params: Joi.object().optional(),
  query: Joi.object().optional(),
  body: Joi.object({
    title: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(255).required(),
    condition: Joi.string()
      .valid("new", "like_new", "good", "fair", "poor")
      .required(),
  }),
});

module.exports = { createBookSchema };
