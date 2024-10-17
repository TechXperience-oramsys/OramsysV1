const Corporation = require("../models/userAdmins/userAdmin");
const { getJWTToken } = require("../utils/jwt.helper");
const httpStatus = require("http-status");
const APIResponse = require("../helpers/APIResponse");
const { comparePassword } = require("../utils/bcrypt.helper");

const login = () => async (req, res) => {
  try {
    const body = req.body;

    const admin = await Corporation.findOne({ businessEmail: body.email });
    if (admin) {
      const match = await comparePassword(body.password, admin.password);
      if (match) {
        const token = getJWTToken({
          id: admin.id,
          email: body.email,
          role: "Admin",
        });

        let newAdmin;
        newAdmin = {
          id: admin.id,
          email: admin.email,
          name: admin.adminName,
          token: token,
        };

        return res
          .status(httpStatus.OK)
          .json(new APIResponse(newAdmin, "Login Successful", httpStatus.OK));
      }
      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(
            null,
            "Wrong Password",
            httpStatus.OK,
            "Wrong Password"
          )
        );
    }

    return res
      .status(httpStatus.OK)
      .json(new APIResponse(null, "Wrong email", httpStatus.BAD_REQUEST));
  } catch (e) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Somethig went wrong" });
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
