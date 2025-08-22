const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const { signUpSchema, loginSchema } = require('../validation/auth.validation');

const router = Router();

router.post('/signup', validate(signUpSchema), authController.signup);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
