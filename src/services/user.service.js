const { User } = require("../models");

async function getById(id) {
  const user = await User.findByPk(id);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return user.toJSON();
}

module.exports = { getById };