const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../config");

async function signup({ name, email, password }) {
  const existing = await User.findOne({ where: { email } });
  if (existing)
    throw Object.assign(new Error("Email already in use"), { status: 409 });
  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user.id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
  return { user: user.toJSON(), token };
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });
  const ok = await user.validatePassword(password);
  if (!ok)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });
  const token = jwt.sign({ id: user.id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
  return { user: user.toJSON(), token };
}

module.exports = { signup, login };
