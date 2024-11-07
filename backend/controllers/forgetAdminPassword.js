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

        // const mailOptions = {
        //   from: "notification@techxperience.ng",
        //   to: userData.businessEmail,
        //   subject: "OTP Verification",
        //   text: "OTP Recieved for Password",
        //   html: `
        //   <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        //     <p style="font-size: 16px;">Hi, ${userData?.adminName}</p>
        //      <p style="font-size: 12px;">Your OTP is <strong>${otp}<strong></p>
        //   </div>
        // `,
        // };
        const mailOptions = {
          from: "notification@techxperience.ng",
          to: userData.businessEmail,
          subject: "OTP for Password Reset",
          html: `
            <div style="max-width: 600px; margin: 0 auto; background-color: ##F4F8F8; padding: 20px; color: #333;">
              <!-- Header -->
              
        
              <!-- Main Content -->
              <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2 style="color: #4a5568; font-size: 1.2rem;">Hi ${userData?.adminName},</h2>
               
                <p style="font-weight: normal; font-size: 20px;">OTP to reset your password is: ${otp}</p>
                
                <p style="color: #718096; font-size: 14px; margin-top: 20px;">
                  Thanks, <br> Oramsys team
                </p>
              </div>
        
              <!-- Footer -->
              <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #a0aec0; font-size: 0.875rem; margin-top: 20px;">
                <p>
                  This email was sent to ${userData.businessEmail} 
                  If you'd rather not receive this kind of email, you can 
                  <a href="#" style="color: #3182ce; text-decoration: none;">unsubscribe</a> or 
                  <a href="#" style="color: #3182ce; text-decoration: none;">manage your email preferences</a>.
                </p>
                <p style="margin-top: 10px;">© ${new Date().getFullYear()} Oramsys. All Rights Reserved.</p>
              </div>
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
        res.status(401).json({ message: "The OTP your entered is not valid!" });
      }
    } else {
      res.status(401).json({ message: "The OTP your entered is not valid!" });
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
