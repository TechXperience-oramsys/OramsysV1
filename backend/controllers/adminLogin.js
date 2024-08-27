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
          .json(new APIResponse(newAdmin, "Login successfully", httpStatus.OK));
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
      .json(new APIResponse(superAdmin, "Wrong email", httpStatus.OK));
  } catch (e) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Somethig went wrong" });
  }
};

module.exports = { login };
