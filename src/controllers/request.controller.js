const requestService = require("../services/request.service");

async function createRequest(req, res, next) {
  try {
    res.status(201).json(
      await requestService.createRequest({
        requesterId: req.user.id,
        ...req.body,
      })
    );
  } catch (err) {
    next(err);
  }
}

async function listMyRequests(req, res, next) {
  try {
    res.json(await requestService.listMyRequests(req.user.id));
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    res.json(
      await requestService.updateStatus(
        req.params.id,
        req.user.id,
        req.body.status
      )
    );
  } catch (err) {
    next(err);
  }
}

module.exports = { createRequest, listMyRequests, updateStatus };
