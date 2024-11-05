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
            pass: "0ramsys!@#",
          },
        });

        // const mailOptions = {
        //   from: "notification@techxperience.ng",
        //   to: resData.businessEmail,
        //   subject: "Password reset",
        //   text: "Password reset successfully",
        //   html: `
        //   <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        //     <p style="font-size: 16px;">Hi, ${resData?.adminName}</p>
        //      <p style="font-size: 12px;">Your password has been changed succesfully.</p>
        //      <a href='https://oramsys.com/fa-login'>Visit Oramsys</a>
        //   </div>
        // `,
        // };
        const mailOptions = {
          from: "notification@techxperience.ng",
          to: resData.businessEmail,
          subject: "Password reset successful",
          text: "Password reset successfull",
          html: `
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; color: #333;">
              <!-- Header -->
              
        
              <!-- Main Content -->
              <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2 style="color: #4a5568; font-size: 1.5rem;">Bravo ${resData?.adminName},</h2>
               
                <p style="font-weight: bold; font-size: 20px;">Your password has been changed succesfully!</p>
                <a href='https://www.oramsysdev.com/fa-login' style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 0.875rem; font-weight: 500; color: #ffffff; background-color: #3182ce; border-radius: 8px; text-align: center; text-decoration: none;">Visist Oramsys
                </a>
                <p style="color: #718096; font-size: 14px; margin-top: 20px;">
                  Thanks, <br> Oramsys Pilot team
                </p>
              </div>
        
              <!-- Footer -->
              <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #a0aec0; font-size: 0.875rem; margin-top: 20px;">
                <p>
                  This email was sent to ${resData.businessEmail}
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
