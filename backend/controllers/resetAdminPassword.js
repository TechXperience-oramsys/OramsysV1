const Corporation = require("../models/userAdmins/userAdmin");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const resetAdminPassword = () => async (req, res) => {
  try {
    const { password, newPassword, confirmPasswoed } = req?.body;
    const resData = await Corporation.findOne({ _id: req?.query?.id });
    // let match = await bcrypt.compare(password, resData.password);

    if (password == resData.password) {
      let hashedPassword = await bcrypt.hash(newPassword, 10);

      const updateData = await Corporation.findByIdAndUpdate(req.query.id, {
        $set: { password: hashedPassword },
      });

      if (updateData) {
        const transporter = nodemailer.createTransport({
          host: "c116604.sgvps.net",
          port: 465,
          auth: {
            user: "notification@techxperience.ng",
            pass: "Oramsys!@#",
          },
        });

        const mailOptions = {
          from: "notification@techxperience.ng",
          to: resData.businessEmail,
          subject: "Password reset",
          text: "Password reset successfully",
          html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <p style="font-size: 16px;">Hi, ${resData?.adminName}</p>
             <p style="font-size: 12px;">Your password has been changed succesfully.</p>
             <a href='https://oramsys.com/fa-login'>Visit Oramsys</a>
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
        res.status(201).json(updateData);
      }
    } else {
      res
        .status(401)
        .json({ message: "Incorrect old password. Please try again." });
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

module.exports = { resetAdminPassword };
