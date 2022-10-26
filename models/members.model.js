const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 0,
  upperCase: 0,
  numeric: 0,
  symbol: 0,
  requirementCount: 2,
};

const MemberSchema = new mongoose.Schema({
  members_name: { type: String, required: true }, //ชื่อ
  members_email: { type: String, required: true }, //เมล
  members_password: { type: String, required: true }, //รหัส
  members_image: { type: String, required: false, default: "ไม่มี" },
  members_phone: { type: String, required: true },
  members_address1: { type: String, required: true },
  members_address2: { type: String, required: false, default: "" },
  members_city: { type: String, required: false, default: "" },
  members_zip: { type: String, required: false, default: "" },
  members_nationality: { type: String, required: true }, // eng thai อื่น ๆ กรอกเองได้
  members_date_start: { type: Date, required: false, default: Date.now() }, //เริ่ม
});
MemberSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, row: "members" },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "2d",
    }
  );
  return token;
};

const Members = mongoose.model("members", MemberSchema);

const validate = (data) => {
  const schema = Joi.object({
    members_name: Joi.string(),
    members_email: Joi.string(),
    members_password: Joi.string(),
    members_image: Joi.string().default("ไม่มี"),
    members_phone: Joi.string(),
    members_address1: Joi.string(),
    members_address2: Joi.string().default(""),
    members_city: Joi.string().default(""),
    members_zip: Joi.string().default(""),
    members_nationality: Joi.string(),
    members_date_start: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { Members, validate };
