"use strict";

const User = require("../models/user");
const httpStatus = require("http-status");
const APIResponse = require("../helpers/APIResponse");
const { hashPassword, comparePassword } = require("../utils/bcrypt.helper");
const nodemailer = require("nodemailer");
const {
  getJWTToken,
  verifyToken,
  verifyJWTToken,
  decodeToken,
} = require("../utils/jwt.helper");

class UserController {
  //
  // async function login(req, res, next) {
  //   try {
  //     const { user_name, password } = req.body;
  //     if (!user_name || !password) {
  //       return res
  //         .status(httpStatus.BAD_REQUEST)
  //         .json(new APIResponse(null, "Username and password are required", httpStatus.BAD_REQUEST));
  //     }

  //     const userLogin = user_name.toLowerCase();
  //     const user = await User.findOne({ email: userLogin });

  //     if (!user) {
  //       return res
  //         .status(httpStatus.UNAUTHORIZED)
  //         .json(new APIResponse(null, "Invalid credentials", httpStatus.UNAUTHORIZED));
  //     }

  //     const match = await bcrypt.compare(password, user.password);
  //     if (!match) {
  //       return res
  //         .status(httpStatus.UNAUTHORIZED)
  //         .json(new APIResponse(null, "Invalid credentials", httpStatus.UNAUTHORIZED));
  //     }

  //     const token = getJWTToken({
  //       id: user.id,
  //       email: user.email,
  //       role: "user",
  //     });

  //     const newUser = {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       token: token,
  //       admin: user.createdBy
  //     };

  //     return res
  //       .status(httpStatus.OK)
  //       .json(new APIResponse(newUser, "Login Successful", httpStatus.OK));

  //   } catch (e) {
  //     console.error("Login error:", e);
  //     return res
  //       .status(httpStatus.INTERNAL_SERVER_ERROR)
  //       .send({ message: "Something went wrong" });
  //   }
  // }
  //
  async login(req, res, next) {
    try {
      const userLogin = req.body.user_name.toLowerCase();
      const user = await User.findOne({ email: userLogin }).populate({
        path: "createdBy",
        select: "corporationName",
      });
      if (!user) {
        return res
          .status(httpStatus.OK)
          .json(new APIResponse(null, "login failed. incorrect email", httpStatus.NOT_FOUND));
      }
      const match = await comparePassword(req.body.password, user.password);
      if (!match) {
        return res
          .status(httpStatus.OK)
          .json(new APIResponse(null, "Login failed. Incorrect password", httpStatus.NOT_FOUND));
      }

      const token = getJWTToken({
        id: user.id,
        email: req.body.email,
        role: user.role,
      });

      let newUser;
      newUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        department: user.department,
        admin: user.createdBy,
      };

      return res
        .status(httpStatus.OK)
        .json(new APIResponse(newUser, "Login Successfully", httpStatus.OK));
    } catch (e) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Something went wrong" });
    }
  }

  // async login(req, res, next) {
  //   try {
  //     const userLogin = req.body.user_name.toLowerCase();
  //     const user = await User.findOne({ email: userLogin }).populate({
  //       path: "createdBy",
  //       select: "corporationName",
  //     });

  //     if (!user) {
  //       return res
  //         .status(httpStatus.OK)
  //         .json(new APIResponse(null, "Wrong Email", httpStatus.NOT_FOUND));
  //     }

  //     const match = await comparePassword(req.body.password, user.password);
  //     if (!match) {
  //       return res
  //         .status(httpStatus.OK)
  //         .json(new APIResponse(null, "Wrong Password", httpStatus.NOT_FOUND));
  //     }

  //     // Generate the JWT token with user ID, email, and role
  //     const token = getJWTToken({
  //       id: user.id,
  //       email: req.body.email,
  //       role: "user",
  //     });

  //     // Set the JWT token in an HTTP-only cookie
  //     res.cookie('authToken', token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',  // Enables HTTPS in production
  //       sameSite: 'Strict',
  //       maxAge: 60 * 60 * 1000,  // 1 hour
  //     });

  //     // Prepare the user data for response (excluding the token)
  //     const newUser = {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       department: user.department,
  //       admin: user.createdBy,
  //     };

  //     // Send the response to the client
  //     return res
  //       .status(httpStatus.OK)
  //       .json(new APIResponse(newUser, "Login Successfully", httpStatus.OK));
  //   } catch (e) {
  //     return res
  //       .status(httpStatus.BAD_REQUEST)
  //       .send({ message: "Something went wrong" });
  //   }
  // }


  async signUp(req, res, next) {
    let body = req.body;
    function generateOTP() {
      let otp = "";
      for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10);
      }
      return otp;
    }
    const otp = generateOTP();
    let newPassword = "";
    if (req.body.password) {
      newPassword = await hashPassword(req.body.password, 10);
    } else {
      newPassword = ""
    }
    const newUser = {
      name: body.name,
      email: body.email.toLowerCase(),
      password: newPassword,
      otp: otp,
      createdBy: body.createdBy,
    };
    // console.log(generateOTP());
    const model = new User(newUser);
    try {
      const alreadyExist = await User.getUserByEmail(req.body.email);
      // console.log("tetstyuuuo jhyuh");
      if (!alreadyExist.length) {
        const nodemailer = require("nodemailer");

        // Replace with your actual credentials (avoid hardcoding in production)
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
          to: body?.email,
          subject: "Invitation to Join Oramsys",
          html: `
            <div style="max-width: 600px; margin: 0 auto; background-color: #F4F8F8; padding: 20px; color: #333;">
              <!-- Header -->
              
        
              <!-- Main Content -->
              <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2 style="color: #4a5568; font-size: 1.5rem;">Hi ${body.name},</h2>
                <p style="color: #718096; font-size: 14px;">
                You have been onboarded on the Oramsys platform.
                </p>
                <p style="color: #718096; font-size: 14px;">
                Click on the link below to enter the OTP and create a password
                </p>
                <p style="font-weight: bold; font-size: 20px;">OTP: ${otp}</p>
                <a href="https://www.oramsysdev.com/verify-user" style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 0.875rem; font-weight: 500; color: #ffffff; background-color: #3182ce; border-radius: 8px; text-align: center; text-decoration: none;">
                  Accept & continue
                </a>
                <p style="color: #718096; font-size: 14px; margin-top: 20px;">
                  Thanks, <br> Oramsys team
                </p>
              </div>
        
              <!-- Footer -->
              <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #a0aec0; font-size: 0.875rem; margin-top: 20px;">
                <p>
                  This email was sent to ${body?.email} 
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
        const saveResponse = await model.save();
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              saveResponse,
              "User created successfully.",
              httpStatus.OK
            )
          );
      } else if (alreadyExist.email === req.body.email) {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "email is already exist" });
      }
    } catch (e) {
      if (e.code === 11000) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "user is already exist" });
      } else {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new APIResponse(
              {},
              "Error Adding User",
              httpStatus.INTERNAL_SERVER_ERROR,
              e
            )
          );
      }
    }
  }

  // async getAllUser(req, res, next) {
  //   // try {
  //   const user = await User.getAll(req.query.id, req.query.role);
    

  //   if (user) {
  //     return res
  //       .status(httpStatus.OK)
  //       .json(new APIResponse(user, "User get successfully.", httpStatus.OK));
  //   }

  //   return res
  //     .status(httpStatus.BAD_REQUEST)
  //     .send({ message: "user not found" });
  // }
  async getAllUser(req, res, next) {
    try {
      const users = await User.find({
        orderBy: ["createdAt", "DESC"]
      }); 
      
      if (users.length > 0) {
        for (let user of users) {
          if (user?.isRegistered === false && user?.password) {
            user.isRegistered = true 
            await user.save()
          }
          }
        
        // console.log(users, 'inflow')
        const usersWithStatus = users.map((user) => ({
          ...user.toObject(),
          registrationStatus: user.isRegistered ? "Registered" : "Invited",
        }));
  
        return res.status(httpStatus.OK).json({
          message: "Users retrieved successfully.",
          data: usersWithStatus, 
        });
      }
  
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "No users found" });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred while fetching users." });
    }
  }
  

  async getUserById(req, res, next) {
    try {
      const user = await User.getById(req.params.id);

      if (user) {
        return res
          .status(httpStatus.OK)
          .json(new APIResponse(user, "User get successfully.", httpStatus.OK));
      }

      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "User not found" });
    } catch (e) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Somethig went wrong" });
    }
  }

  async editUser(req, res, next) {
    try {
      const alreadyExist = await User.getUserByEmail(req.body.email);
      console.log("alreadyExist", alreadyExist);
      if (alreadyExist.length) {
        if (alreadyExist[0]._id.toString() !== req.params.id) {
          return res
            .status(httpStatus.OK)
            .json(new APIResponse({}, "Email is already exist", httpStatus.OK));
        } else {
          const user = await User.getById(req.params.id);
          if (user) {
            const updatedUser = await User.updateUser(req.body, req.params.id);
            return res
              .status(httpStatus.OK)
              .json(
                new APIResponse(
                  updatedUser,
                  "User updated successfully.",
                  httpStatus.OK
                )
              );
          } else {
            return res
              .status(httpStatus.BAD_REQUEST)
              .send({ message: "User not found" });
          }
        }
      } else {
        const user = await User.getById(req.params.id);
        if (user) {
          const updatedUser = await User.updateUser(req.body, req.params.id);
          return res
            .status(httpStatus.OK)
            .json(
              new APIResponse(
                updatedUser,
                "User updated successfully.",
                httpStatus.OK
              )
            );
        } else {
          return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "User not found" });
        }
      }
    } catch (e) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Somethig went wrong" });
    }
  }

  async deleteUser(req, res, next) {
    try {
      const user = await User.getUserById(req.params.id);

      if (user) {
        await User.deleteUser(req.params.id);

        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse({}, "User deleted successfully.", httpStatus.OK)
          );
      }

      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "User not found" });
    } catch (e) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Somethig went wrong" });
    }
  }

  async verifyUser(req, res, next) {
    try {
      const user = await User.getUserById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json(new APIResponse(null, "User not found", 401));
      }

      const token = getJWTToken({
        id: user.id,
        email: req.body.email,
      });

      let newUser;
      newUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      };

      return res
        .status(httpStatus.OK)
        .json(new APIResponse(newUser, "User verified", 200));
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          new APIResponse(null, "User not found", httpStatus.BAD_REQUEST, error)
        );
    }
  }

  async verifyToken(req, res, next) {
    try {
      // console.log("req", req.headers.authorization);
      const user = decodeToken(req.headers.authorization);
      if (!user) {
        return res
          .status(401)
          .json(new APIResponse(null, "invalid token", 401));
      }
      return res
        .status(httpStatus.OK)
        .json(new APIResponse(user, "Token verified", 200));
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          new APIResponse(null, "invalid token", httpStatus.BAD_REQUEST, error)
        );
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const otp = req.body.otp;
      // console.log(otp, "otp");
      if (!otp) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(
            new APIResponse(null, "OTP is required", httpStatus.BAD_REQUEST)
          );
      }
      const user = await User.findOne({ otp });
      // console.log(user, "user");
      if (!user) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json(new APIResponse(null, "Invalid OTP", httpStatus.UNAUTHORIZED));
      }
      return res
        .status(httpStatus.OK)
        .json(new APIResponse(user, "OTP verified", httpStatus.OK));
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            null,
            "Error verifying OTP",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }

  async updatePassword(req, res, next) {
    try {
      const user = await User.getById(req.params.id);
      if (!user) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Invalid Id!" });
      }
      const { password, confirm_password } = req.body;
      if (password !== confirm_password) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Password does not match!" });
      }
      const newPassword = await hashPassword(password, 10);
      const updatedUser = await User.updateUser(
        { password: newPassword, isRegistered: true },
        user._id
      );
      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(
            updatedUser,
            "Password updated successfully!!..",
            httpStatus.OK
          )
        );
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            null,
            "Error updating password",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }
  async sendOtp(req, res, next) {
    try {
      const user = await User.findOne({ email: req?.body?.email });
      if (!user) {
        res.status(401).json({ message: "Enter a registred email!" });
      } else {
        const otp = Math.floor(Math.random() * 999999);
        const resData = await User.findByIdAndUpdate(user._id, {
          $set: { otp: otp },
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
            to: user?.email,
            subject: "OTP for Password Reset",
            html: `
              <div style="max-width: 600px; margin: 0 auto; background-color: #F4F8F8; padding: 20px; color: #333;">
                <!-- Header -->
                
          
                <!-- Main Content -->
                <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                  <h2 style="color: #4a5568; font-size: 1.5rem;">Hi ${user?.name},</h2>
                  <p style="color: #718096; font-size: 14px;">
                  OTP to reset your password is <strong>${otp}</strong>
                  </p>
                 
                  <p style="color: #718096; font-size: 14px; margin-top: 20px;">
                    Thanks, <br> Oramsys team
                  </p>
                </div>
          
                <!-- Footer -->
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #a0aec0; font-size: 0.875rem; margin-top: 20px;">
                  <p>
                    This email was sent to ${user?.email} 
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
  }

  async verifyUserOtp(req, res, next) {
    try {
      const body = req.body;
      const userData = await User.findOne({ email: body.email });
      if (userData) {
        if (userData.otp == body.otp) {
          // await User.findByIdAndUpdate(userData._id, { $set: { isRegistered: true } });
          res.status(201).json({ message: "OTP Verified. User registration completed!" });
        } else {
          res.status(401).json({ message: "Invalid OTP!" });
        }
      } else {
        res.status(401).json({ message: "User not found!" });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }


  async setPassword(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await User.findOne({ email });
  
      if (!userData) {
        return res.status(401).json({ message: "User not found!" });
      }
  
      const hashedPassword = await hashPassword(password, 10);
  
      const resData = await User.findById(userData._id)
      resData.password = hashedPassword
      resData.isRegistered = true 
      await resData.save()
      // const resData = await User.findByIdAndUpdate(userData._id, {
      //   $set: {
      //     password: hashedPassword,
      //     isRegistered: true, // Mark user as registered
      //   },
      // },
      // { new: true }
      // );
  
      if (resData) {
        return res.status(201).json({
          message: "Password set successfully. User registration completed!!",
        });
      }
  
      res.status(500).json({ message: "Failed to set password." });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
  
      if (error.code === 11000) {
        return res.status(409).json({ message: "Duplicate key error", error: error.message });
      }
  
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
  

  async getUsersByAdmin(req, res, next) {
    // try {
    const user = await User.getByAdminId(req.query.id);

    if (user) {
      return res
        .status(httpStatus.OK)
        .json(new APIResponse(user, "User get successfully.", httpStatus.OK));
    }
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "No users found" });
  }

  // check registered users
 
  // async checkRegistrationStatus(req, res, next) {
  //   try {
  //     const { email } = req.query; // Pass email as a query parameter
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     // Determine registration status
  //     const registrationStatus = user.isRegistered ? "Registered" : "Invited";

  //     res.status(200).json({ registrationStatus });
  //   } catch (error) {
  //     console.error("Unexpected error:", error);
  //     res.status(500).json({ message: "Internal Server Error", error: error.message });
  //   }
  // }


}

var exports = (module.exports = new UserController());
