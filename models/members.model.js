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
  members_phone: { type: String, required: true },
  members_address: { type: String, required: true },
  members_nationality: { type: String, required: true }, // eng thai อื่น ๆ กรอกเองได้
  members_date_start: { type: Date, required: false, default: Date.now() }, //เริ่ม
});
MemberSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, row: "members" },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "2h",
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
    members_phone: Joi.string(),
    members_address: Joi.string(),
    members_nationality: Joi.string(),
    members_date_start: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { Members, validate };
