const Corporation = require("../models/userAdmins/userAdmin");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

//Send OTP for Admin forget Password
const sendOtp = () => async (req, res) => {
  try {
    const body = req.body;
    const userData = await Corporation.findOne({ businessEmail: body.email });

    if (userData) {
      const otp = Math.floor(Math.random() * 999999);
      const resData = await Corporation.findByIdAndUpdate(userData._id, {
        $set: { code: otp },
      });
      if (resData) {
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
          to: userData.businessEmail,
          subject: "OTP Verification",
          text: "OTP Recieved for Password",
          html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <p style="font-size: 16px;">Hi, ${userData?.adminName}</p>
             <p style="font-size: 12px;">Your OTP is here <strong>${otp}<strong>.</p>
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
        res.status(201).json({ message: "OTP sent on your mail." });
      }
    } else {
      res.status(401).json({ message: "Enter a registred email!" });
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

const verifyOtp = () => async (req, res) => {
  try {
    const body = req.body;
    const userData = await Corporation.findOne({ businessEmail: body.email });
    if (userData) {
      if (userData.code == body.otp) {
        res.status(201).json({ message: "OTP Verified" });
      } else {
        res.status(401).json({ message: "OTP not verified!" });
      }
    } else {
      res.status(401).json({ message: "OTP not verified!" });
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

const setPassword = () => async (req, res) => {
  try {
    const body = req.body;
    const userData = await Corporation.findOne({ businessEmail: body.email });
    if (userData) {
      let hashedPassword = await bcrypt.hash(body.password, 10);
      const resData = await Corporation.findByIdAndUpdate(userData._id, {
        $set: { password: hashedPassword },
      });
      if (resData) {
        res.status(201).json({
          message: "Password Changed Successfully!",
        });
      }
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

module.exports = { sendOtp, verifyOtp, setPassword };
