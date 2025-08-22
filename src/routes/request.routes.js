const { Router } = require('express');
const requestController = require('../controllers/request.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createRequestSchema } = require('../validation/request.validation');

const router = Router();

router.post('/', auth, validate(createRequestSchema), requestController.createRequest);
router.get('/mine', auth, requestController.listMyRequests);
router.patch('/:id/status', auth, requestController.updateStatus);

module.exports = router;
