const userService = require("../services/user.service");

async function getProfile(req, res, next) {
  try {
    const user = await userService.getById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile };
