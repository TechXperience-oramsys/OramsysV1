const express = require('express');
const router = express.Router();
const { createAdmin , validateCorporationData } = require('../controllers/createAdmin');

// Apply the middleware and controller
router.post('/create-admin',validateCorporationData ,  createAdmin() );

module.exports = router;
