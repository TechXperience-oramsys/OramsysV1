const { body, validationResult } = require("express-validator");
const Corporation = require("../models/userAdmins/userAdmin");
const APIResponse = require("../helpers/APIResponse");

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
    // Define character sets
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    // Combine all character sets
    const allChars = uppercase + lowercase + numbers + specialChars;

    // Ensure the password contains at least one character from each set
    const getRandomChar = (chars) =>
      chars.charAt(Math.floor(Math.random() * chars.length));

    let password = "";

    // Add at least one character from each set to ensure complexity
    password += getRandomChar(uppercase);
    password += getRandomChar(lowercase);
    password += getRandomChar(numbers);
    password += getRandomChar(specialChars);

    // Fill the remaining length with random characters from all character sets
    for (let i = 4; i < length; i++) {
      password += getRandomChar(allChars);
    }

    // Shuffle the password to avoid predictable patterns
    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    return password;
  }

  try {
    // Extract data from the request body
    const {
      corporationName,
      businessEmail,
      registrationNumber,
      phone,
      address1,
      address2,
      buildingNumber,
      branch,
      logo,
      adminName,
      code,
    } = req.body;

    const password = generateRandomPassword(12);

    const corporationData = {
      corporationName,
      businessEmail,
      registrationNumber,
      phone,
      address1,
      address2,
      buildingNumber,
      branch,
      logo,
      adminName,
      code,
      password,
    };

    // Create and save the new corporation
    const newCorporation = await Corporation.createCorporation(corporationData);
    console.log("Corporation created:", newCorporation);
    const nodemailer = require("nodemailer");

    console.log(newCorporation, "newCorporation");

    if (newCorporation) {
      // Replace with your actual credentials (avoid hardcoding in production)
      const transporter = nodemailer.createTransport({
        host: "c116604.sgvps.net",
        port: 465,
        auth: {
          user: "notification@techxperience.ng",
          pass: "0ramsys!@#",
        },
      });
      // Email content
      const id = newCorporation._id.toString(); // Convert ObjectId to string if necessary
      const mailOptions = {
        from: "notification@techxperience.ng",
        to: req.body.businessEmail,
        subject: "OTP from Oramsys",
        text: "User created successfully",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <p style="font-size: 16px;">Hi, ${req?.body?.adminName}</p>
             <p style="font-size: 12px;">You have been onboarded on the Oramsys platform. Click on the link below to reset your password.</p>
            <p style="font-size: 12px;">Your current password is <strong>${password}</strong>.</p>
            <p>
              <a href="https://oramsysdev.com/verifyAdmin.html?id=${id}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
             Reset password and login
              </a>
            </p>
          </div>
        `,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      });
      // Send back the created corporation data as a response
      res.status(201).json(newCorporation);
    }
  } catch (error) {
    // Handle specific error types
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
