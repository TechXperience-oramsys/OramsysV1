const Corporation = require("../models/userAdmins/userAdmin");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const sendOtp = async (req, res) => {
  try {
    const { email, type } = req.body; // Ensure req.body is correctly passed

    const Model = type === "corporation" ? Corporation : User;
    const userData = await Model.findOne(type === "corporation" ? { businessEmail: email } : { email });

    if (!userData) {
      return res.status(401).json({ message: "Enter a registered email!" });
    }

    const otp = Math.floor(Math.random() * 999999);
    const updateField = type === "corporation" ? { code: otp } : { otp: otp };

    const resData = await Model.findByIdAndUpdate(userData._id, { $set: updateField });
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
        to: type === "corporation" ? userData.businessEmail : userData.email,
        subject: "OTP Verification",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <p style="font-size: 16px;">Hi, ${type === "corporation" ? userData.adminName : userData.name}</p>
            <p style="font-size: 12px;">Your OTP is:  <strong>${otp}</strong></p>
          </div>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      });

      res.status(201).json({ message: "OTP sent on your mail." });
    }
  } catch (error) {
    handleError(error, res);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp, type } = req.body;

    const Model = type === "corporation" ? Corporation : User;
    const userData = await Model.findOne(type === "corporation" ? { businessEmail: email } : { email });

    if (userData && ((type === "corporation" && userData.code === otp) || userData.otp === otp)) {
      res.status(201).json({ message: "OTP Verified" });
    } else {
      res.status(401).json({ message: "OTP not verified!" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

const setPassword = async (req, res) => {
  try {
    const { email, password, type } = req.body;

    const Model = type === "corporation" ? Corporation : User;
    const userData = await Model.findOne(type === "corporation" ? { businessEmail: email } : { email });

    if (userData) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateField = { password: hashedPassword };

      const resData = await Model.findByIdAndUpdate(userData._id, { $set: updateField });
      if (resData) {
        res.status(201).json({ message: "Password Changed Successfully!" });
      }
    }
  } catch (error) {
    handleError(error, res);
  }
};

// Error handling function
const handleError = (error, res) => {
  if (error.name === "ValidationError") {
    res.status(400).json({ message: "Validation error", errors: error.errors });
  } else if (error.code && error.code === 11000) {
    res.status(409).json({ message: "Duplicate key error", error: error.message });
  } else {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { sendOtp, verifyOtp, setPassword };
