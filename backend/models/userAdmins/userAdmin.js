"use strict";

const mongoose = require("mongoose");
const { type } = require("os");
var Schema = mongoose.Schema;

var CorporationSchema = new Schema(
  {
    corporationName: { type: String, required: true },
    businessEmail: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    buildingNumber: { type: String },
    branch: { type: String },
    logo: { type: String }, // Assuming logo is stored as a binary data
    adminName: { type: String },
    isDeleted: { type: Boolean, default: false },
    code: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

CorporationSchema.statics.createCorporation = async function (corporationData) {
  const corporation = new this(corporationData);
  return await corporation.save();
};

CorporationSchema.statics.getCorporationByEmail = async function (email) {
  return await this.findOne({ businessEmail: email, isDeleted: false }).exec();
};

CorporationSchema.statics.updateAdmin = async function (data, id) {
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

module.exports = mongoose.model("Corporation", CorporationSchema);
