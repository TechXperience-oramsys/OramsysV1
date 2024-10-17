const { body, validationResult } = require("express-validator");
const Corporation = require("../models/userAdmins/userAdmin");
const APIResponse = require("../helpers/APIResponse");
const mjml = require('mjml');

// Middleware for validation
const validateCorporationData = [
  body("corporationName")
    .notEmpty()
    .withMessage("Corporation name is required"),
  body("businessEmail")
    .isEmail()
    .withMessage("Valid business email is required"),
  body("registrationNumber")
    .notEmpty()
    .withMessage("Registration number is required"),
  body("phone"),
  body("address1").notEmpty().withMessage("Address1 is required"),
  body("address2").optional().isString(),
  body("buildingNumber").optional().isString(),
  body("branch").optional().isString(),
  body("logo").optional().isString(), // Assuming logo is a base64 string
  body("adminName"),
  body("code"),
  body("password"),
];

const createAdmin = () => async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  function generateRandomPassword(length = 12) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    const allChars = uppercase + lowercase + numbers + specialChars;
    const getRandomChar = (chars) =>
      chars.charAt(Math.floor(Math.random() * chars.length));

    let password = "";
    password += getRandomChar(uppercase);
    password += getRandomChar(lowercase);
    password += getRandomChar(numbers);
    password += getRandomChar(specialChars);

    for (let i = 4; i < length; i++) {
      password += getRandomChar(allChars);
    }

    password = password.split("").sort(() => 0.5 - Math.random()).join("");
    return password;
  }

  try {
    const {
      corporationName, businessEmail, registrationNumber, phone, address1,
      address2, buildingNumber, branch, logo, adminName, code,
    } = req.body;

    const password = generateRandomPassword(12);
    const corporationData = {
      corporationName, businessEmail, registrationNumber, phone, address1,
      address2, buildingNumber, branch, logo, adminName, code, password,
    };

    const newCorporation = await Corporation.createCorporation(corporationData);
    console.log("Corporation created:", newCorporation);

    const nodemailer = require("nodemailer");
    const id = newCorporation._id.toString();

    const mjmlTemplate = `
      <mjml>
        <mj-body background-color="#f5f5f5">
          <mj-section>
            <mj-column>
              <mj-text font-size="16px" font-weight="semibold" color="#333">Hi, ${adminName}</mj-text>
              <mj-text font-size="15px" color="#333">
                You have been onboarded as an Administrator on the Oramsys platform. 
                Click the link below to create your password.
              </mj-text>
              <mj-text font-size="14px" font-weight="bold">
                Your current password is <strong style="margin-left: 5px; color: #3C0412; font-weight: bold; font-size: 20px;">${password}</strong>
                
              </mj-text>
              <mj-button href="https://www.oramsysdev.com/verify-admin?id=${id}" background-color="#0070E0" margin="auto color="white" font-weight="bold">
                Reset password and login
              </mj-button>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `;

    const htmlOutput = mjml(mjmlTemplate).html;

    const transporter = nodemailer.createTransport({
      host: "c116604.sgvps.net",
      port: 465,
      auth: {
        user: "notification@techxperience.ng",
        pass: "0ramsys!@#",
      },
    });

    const mailOptions = {
      from: "notification@techxperience.ng",
      to: businessEmail,
      subject: "OTP from Oramsys",
      html: htmlOutput,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    res.status(201).json(newCorporation);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation error", errors: error.errors });
    } else if (error.code && error.code === 11000) {
      res.status(409).json({ message: "Duplicate key error", error: error.message });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
};

const updateAdmin = () => async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const admin = await Corporation.findById(req.params.id);

    if (admin) {
      const updatedAdmin = await Corporation.findOneAndUpdate(
        { _id: admin._id },
        { $set: req.body }
      );
      return res
        .status(201)
        .json(new APIResponse(updatedAdmin, "Admin updated successfully."));
    } else {
      return res.status(400).send({ message: "Admin not found" });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      // Mongoose validation error
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else if (error.code && error.code === 11000) {
      // MongoDB duplicate key error
      res
        .status(409)
        .json({ message: "Duplicate key error", error: error.message });
    } else {
      // General server error
      console.error("Unexpected error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
};

module.exports = { createAdmin, updateAdmin, validateCorporationData };
