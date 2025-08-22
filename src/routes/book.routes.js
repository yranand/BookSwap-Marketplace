const { Router } = require('express');
const bookController = require('../controllers/book.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createBookSchema } = require('../validation/book.validation');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config');

const uploadDir = path.join(process.cwd(), config.uploads.dir);
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const router = Router();

router.post('/', auth, upload.single('image'), validate(createBookSchema), bookController.createBook);
router.get('/', bookController.listBooks);
router.get('/mine', auth, bookController.listMyBooks);
router.put('/:id', auth, upload.single('image'), bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
