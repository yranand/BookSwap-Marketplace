const { Router } = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

const router = Router();

router.get('/me', auth, userController.getProfile);

module.exports = router;
