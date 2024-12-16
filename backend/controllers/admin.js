const Corporation = require("../models/userAdmins/userAdmin");
const { getJWTToken } = require("../utils/jwt.helper");
const httpStatus = require("http-status");
const APIResponse = require("../helpers/APIResponse");
const { comparePassword } = require("../utils/bcrypt.helper");
const User = require("../models/user");

const login = () => async (req, res) => {
  try {
    const body = req.body;

    // Find admin by email
    const admin = await Corporation.findOne({ businessEmail: body.email });
    if (!admin) {
      return res
        .status(httpStatus.OK)
        .json(new APIResponse(null, "Sorry, Unauthorized email", httpStatus.NOT_FOUND));
    }

    // Check if the password matches
    const match = await comparePassword(body.password, admin.password);
    if (!match) {
      return res
        .status(httpStatus.OK)
        .json(new APIResponse(null, "Incorrect password", httpStatus.NOT_FOUND));
    }

    if (admin) {

      if (match) {
        // Generate token with expiration time of 2 minutes
        const token = getJWTToken({
          id: admin.id,
          email: body.email,
          role: "Admin",
        }, "2m"); // Token expires in 2 minutes

        const newAdmin = {
          id: admin.id,
          email: admin.email,
          name: admin.adminName,
          token: token,
        };

        return res
          .status(httpStatus.OK)
          .json(new APIResponse(newAdmin, "Login Successful", httpStatus.OK));
      }

      // Password is incorrect but email exists
      // return res
      //   .status(httpStatus.UNAUTHORIZED)
      //   .json(
      //     new APIResponse(
      //       null,
      //       "Sorry, password is incorrect.",
      //       httpStatus.UNAUTHORIZED
      //     )
      //   );
    }

    // Admin email doesn't exist
    const user = await User.findOne({ email: body.email });
    if (user) {
      // If email belongs to a user but not an admin
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json(
          new APIResponse(
            null,
            "Sorry, invalid credentials. Please try login as a user.",
            httpStatus.UNAUTHORIZED
          )
        );
    }

    // Neither email nor password is recognized
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json(
        new APIResponse(
          null,
          "Sorry, invalid credentials.",
          httpStatus.UNAUTHORIZED
        )
      );
  } catch (e) {
    // Catch unexpected errors
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong." });
  }
};


const getAllAdmins = () => async (req, res) => {
  try {
    const admins = await Corporation.find({});
    if (admins) {
      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(admins, "Admins get successfully.", httpStatus.OK)
        );
    }
  } catch (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Somethig went wrong" });
  }
};

const getAdminById = () => async (req, res) => {
  try {
    const user = await Corporation.findById(req.params.id);
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "User not found!" });
    }
    return res
      .status(httpStatus.OK)
      .json(new APIResponse([user], "Admin get successfully.", httpStatus.OK));
  } catch (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Somethig went wrong" });
  }
};
module.exports = { login, getAllAdmins, getAdminById };
