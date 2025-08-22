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
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const router = Router();

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Unexpected field. Use "image" as the field name for file uploads.' });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err.message === 'Only image files are allowed') {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

router.post('/', auth, upload.single('image'), handleMulterError, validate(createBookSchema), bookController.createBook);
router.get('/', bookController.listBooks);
router.get('/mine', auth, bookController.listMyBooks);
router.put('/:id', auth, upload.single('image'), handleMulterError, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
