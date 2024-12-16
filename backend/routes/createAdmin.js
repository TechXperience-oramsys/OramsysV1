const express = require("express");
const router = express.Router();
const { createAdmin,  validateCorporationData, updateAdmin } = require("../controllers/createAdmin");
const { resetAdminPassword } = require("../controllers/resetAdminPassword");
const { sendOtp, verifyOtp, setPassword } = require("../controllers/forgetAdminPassword");
const { login, getAllAdmins, getAdminById } = require("../controllers/admin");
// const userController = require("../controllers/user");
const httpStatus = require("http-status");
const Joi = require("joi");
const APIResponse = require("../helpers/APIResponse");
const { decodeToken } = require("../utils/jwt.helper");
const { Adminauthenticate } = require("../middleware/AuthMiddleware");

// Apply the middleware and controller
router.post("/create-admin", validateCorporationData, createAdmin());
router.post("/reset-password", resetAdminPassword());
router.post("/send-otp", sendOtp());
router.post("/verify-otp", verifyOtp());
router.post("/set-password", setPassword());
router.post("/login", loginValidate, login());
router.get("/getAdmins", getAllAdmins());
router.get("/get-admin-by/:id", verifyToken, getAdminById());
// router.get('/check-registration-status', userController.checkRegistrationStatus);

router.put(
  "/update-admin/:id",
  verifyToken,
  validateCorporationData,
  updateAdmin()
);

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

function verifyToken(req, res, next) {
  try {
    const bearer = req.header("Authorization");
    if (!bearer) {
      res.status(401).send(`No token given.`);
      return false;
    }

    const tokens = decodeToken(bearer);
    if (!tokens || tokens.length < 2) {
      res.status(401).send(`Expect bearer token.`);
      return false;
    } else {
      next();
      return true;
    }
  } catch (e) {
    console.log(e);
    Sentry.captureException(e);
    return res.status(401).send(`Invalid input or token.`);
  }
}
module.exports = router;
