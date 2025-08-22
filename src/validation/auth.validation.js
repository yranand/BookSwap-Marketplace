const Joi = require("joi");

const signUpSchema = Joi.object({
  params: Joi.object().optional(),
  query: Joi.object().optional(),
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
  }),
});

const loginSchema = Joi.object({
  params: Joi.object().optional(),
  query: Joi.object().optional(),
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = { signUpSchema, loginSchema };
