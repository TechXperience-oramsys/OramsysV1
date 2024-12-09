"use strict";

const mongoose = require("mongoose");
const { UserProfileTypes, UserDepartmentTypes } = require("../utils/enums");
var Schema = mongoose.Schema;

var Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    isDeleted: { type: Boolean, required: true, default: false },
    department: { type: String, required: false, enum: UserDepartmentTypes, default: UserDepartmentTypes.Information_Technology },
    profile: { type: String, required: true, enum: UserProfileTypes, default: UserProfileTypes.User },
    otp: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: "Corporation" },
    isRegistered: { type: Boolean, required: true, default: false }, // New field
    registrationStatus: { type: String, required: true, default: 'Invited'}
  },
  {
    timestamps: true,
  }
);

Schema.statics.createUser = async function () {
  return await this.Save();
};

// Schema.statics.getAll = async function () {
//     return await this.find({ isDeleted: false }).sort({ name: 1 }).exec();
// }

// Schema.statics.getAll = async function (createdBy , userType) {
// console.log(userType , createdBy , 'logs here');

//     if(userType.toLowerCase() == 'admin'){
//         return await this.find({ isDeleted: false ,  createdBy: createdBy }).sort({ name: 1 }).exec();
//     }else{
//         return await this.find({ isDeleted: false }).sort({ name: 1 }).exec();
//     }

// }

Schema.statics.getAll = async function (createdBy, userType) {
  console.log(userType, createdBy, "logs please here");

  const query = { isDeleted: false };
  if (userType?.toLowerCase() === "admin") {
    query.createdBy = createdBy;
  }

  return await this.find(query)
    .sort({ name: 1 })
    .populate({
      path: "createdBy",
      select: "corporationName",
    })
    .exec();
};

Schema.statics.getById = async function (id) {
  return await this.findOne({ _id: id, isDeleted: false }).exec();
};

Schema.statics.getUserByEmail = async function (loginUser) {
  return await this.find({ email: loginUser, isDeleted: false }).exec();
};

Schema.statics.updateUser = async function (data, id) {
  return await this.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: data,
    },
    {
      new: true,
    }
  );
};

Schema.statics.deleteUser = async function (id) {
  return await this.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    {
      new: true,
    }
  );
};

Schema.statics.getUsersFromArrayOfIds = async function (ids) {
  return await this.find({
    _id: { $in: ids },
  }).select("name");
};

Schema.statics.getUserByRole = async function (Role) {
  return await this.find({ isDeleted: false, role: Role })
    .sort({ name: 1 })
    .exec();
};


Schema.statics.getByAdminId = async function (id) {
  return await this.find({ isDeleted: false, createdBy: id })
    .sort({ name: 1 })
    .exec();
};

module.exports = mongoose.model("User", Schema);
