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

const PartnersSchema = new mongoose.Schema({
  partner_name: { type: String, required: true }, //ชื่อ
  partner_email: { type: String, required: true }, //เมล
  partner_password: { type: String, required: true }, //รหัส
  partner_card_image: { type: String, required: true }, //รูปบัตรประจำตัวประชาชน
  partner_bookbank_image: { type: String, required: true }, //รูปบัญชีธนาคาร
  partner_status: { type: Boolean, require: false, default: true },
  partner_phone: { type: String, require: false, default: "ไม่มี" },
  partner_address: {
    Thai: { type: String, required: false, default: "ไม่มี" },
    Eng: { type: String, required: false, default: "ไม่มี" },
    Cambodia: { type: String, required: false, default: "ไม่มี" },
    Myanmar: { type: String, required: false, default: "ไม่มี" },
    Laos: { type: String, required: false, default: "ไม่มี" },
    China: { type: String, required: false, default: "ไม่มี" },
  },

  partner_name_center: {
    Thai: { type: String, required: false, default: "ไม่มี" },
    Eng: { type: String, required: false, default: "ไม่มี" },
    Cambodia: { type: String, required: false, default: "ไม่มี" },
    Myanmar: { type: String, required: false, default: "ไม่มี" },
    Laos: { type: String, required: false, default: "ไม่มี" },
    China: { type: String, required: false, default: "ไม่มี" },
  },
});

PartnersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, row: "partner" },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

const Partners = mongoose.model("partner", PartnersSchema);

const validate = (data) => {
  const schema = Joi.object({
    partner_name: Joi.string(),
    partner_email: Joi.string(),
    partner_password: passwordComplexity(complexityOptions)
      .required()
      .label("partner_password"),
    partner_card_image: Joi.string(),
    partner_bookbank_image: Joi.string(),
    partner_status: Joi.bool().default(true),
    partner_phone: Joi.string().default("ไม่มี"),
    partner_address: Joi.object({
      Thai: Joi.string().default("ไม่มี"),
      Eng: Joi.string().default("ไม่มี"),
      Cambodia: Joi.string().default("ไม่มี"),
      Myanmar: Joi.string().default("ไม่มี"),
      Laos: Joi.string().default("ไม่มี"),
      China: Joi.string().default("ไม่มี"),
    }),
    partner_name_center: Joi.object({
      Thai: Joi.string().default("ไม่มี"),
      Eng: Joi.string().default("ไม่มี"),
      Cambodia: Joi.string().default("ไม่มี"),
      Myanmar: Joi.string().default("ไม่มี"),
      Laos: Joi.string().default("ไม่มี"),
      China: Joi.string().default("ไม่มี"),
    }),
  });
  return schema.validate(data);
};

module.exports = { Partners, validate };
