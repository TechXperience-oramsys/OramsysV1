const express = require("express");
const router = express.Router();
const {
  createAdmin,
  validateCorporationData,
} = require("../controllers/createAdmin");
const { resetAdminPassword } = require("../controllers/resetAdminPassword");

// Apply the middleware and controller
router.post("/create-admin", validateCorporationData, createAdmin());
router.post("/reset-password", resetAdminPassword());

module.exports = router;
