const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../controllers/uploadFile');

// Apply the middleware and controller
router.post('/upload-file', upload, uploadFile);

module.exports = router;
