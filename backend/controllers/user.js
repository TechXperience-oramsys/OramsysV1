"use strict";

const User = require("../models/user");
const httpStatus = require("http-status");
const APIResponse = require("../helpers/APIResponse");
const { hashPassword, comparePassword } = require("../utils/bcrypt.helper");
const {
  getJWTToken,
  verifyToken,
  verifyJWTToken,
  decodeToken,
} = require("../utils/jwt.helper");

class UserController {
  async login(req, res, next) {
    try {
      const userLogin = req.body.user_name.toLowerCase();
      const user = await User.findOne({ email: userLogin });
      if (!user) {
        return res
          .status(httpStatus.OK)
          .json(new APIResponse(null, "Wrong Email", httpStatus.NOT_FOUND));
      }
      const match = await comparePassword(
        req.body.password,
        user.password
      );
      if (!match) {
        return res
          .status(httpStatus.OK)
          .json(new APIResponse(null, "Wrong Password", httpStatus.NOT_FOUND));
      }

      const token = getJWTToken({
        id: user.id,
        email: req.body.email,
        role: "user",
      });
      console.log(user[0], 'here  new user');
      let newUser;
      newUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        admin: user.createdBy
      };

      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(newUser, "Login Successfully", httpStatus.OK)
        );



    } catch (e) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Somethig went wrong" });
    }
  }

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
      newPassword = await hashPassword("", 10);
    }
    const newUser = {
      name: body.name,
      email: body.email.toLowerCase(),
      password: newPassword,
      otp: otp,
      createdBy: body.createdBy
    };
    console.log(generateOTP());
    const model = new User(newUser);


    try {
      const alreadyExist = await User.getUserByEmail(req.body.email);
      console.log("tetstyuuuo jhyuh");
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
        // Email content
        const mailOptions = {
          from: "notification@techxperience.ng", // Sender address
          to: body.email, // List of recipients
          subject: "Otp from oramsys",
          text: "User create succesfully ", // Plain text body
          html: `<b>This is the otp  ${otp} by using this otp you can create your password </b>
                     <a href="http://localhost:3001/verify.html?id=${model._id}"> Verify Account</a>`,

          // HTML body (optional)
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
        res.status(httpStatus.OK).send({ message: "email is already exist" });
      } else {
        res.status(httpStatus.OK).send({ message: "Error Adding User" });
      }
    } catch (e) {
      if (e.code === 11000) {
        return res
          .status(httpStatus.OK)
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

  async getAllUser(req, res, next) {
    // try {



    const user = await User.getAll(req.query.id, req.query.role);

    if (user) {
      return res
        .status(httpStatus.OK)
        .json(new APIResponse(user, "User get successfully.", httpStatus.OK));
    }

    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "user not found" });

    console.log(user, 'pipoiooj');
    // } catch (e) {
    //     console.log(e , 'eee');
    //   return res
    //     .status(httpStatus.BAD_REQUEST)
    //     .send({ message: "Somethig went wrong" });
    // }
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
      console.log("req", req.headers.authorization);
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
    console.log(req.params.id)
    try {
      const otp = req.body.otp;

      if (!req.params.id) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(
            new APIResponse(null, "OTP is required", httpStatus.BAD_REQUEST)
          );
      }
      const user = await User.findOne({ _id: req.params.id });

      if (user.otp !== otp) {
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
          .send({ message: "Password not matched!" });
      }
      const newPassword = await hashPassword(password, 10);
      const updatedUser = await User.updateUser(
        { password: newPassword },
        user._id
      );
      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(
            updatedUser,
            "User updated successfully.",
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
}

var exports = (module.exports = new UserController());