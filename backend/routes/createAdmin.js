const express = require("express");
const router = express.Router();
const { createAdmin, validateCorporationData } = require("../controllers/createAdmin");
const { resetAdminPassword } = require("../controllers/resetAdminPassword");
const { sendOtp, verifyOtp, setPassword } = require("../controllers/forgetAdminPassword");
const { login } = require("../controllers/adminLogin");
const httpStatus = require("http-status");
const Joi = require("joi");
const APIResponse = require("../helpers/APIResponse");

// Apply the middleware and controller
router.post("/create-admin", validateCorporationData, createAdmin());
router.post("/reset-password", resetAdminPassword());
router.post("/send-otp", sendOtp());
router.post("/verify-otp", verifyOtp());
router.post("/set-password", setPassword());
router.post("/login", (req, res, next) => {
  console.log('Login route hit');
  next();
}, login);

const loginValidation = Joi.object({
  email: Joi.string().trim().error(new Error("Please enter Email/Mobile")),
  password: Joi.string().error(new Error("Please enter password")),
});
function loginValidate(req, res, next) {
  const Data = req.body;
  const { error, value } = loginValidation.validate(Data);
  if (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
  } else {
    return next();
  }
}
module.exports = router;
