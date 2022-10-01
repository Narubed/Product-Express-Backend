const mongoose = require("mongoose");
const Joi = require("joi");

const CompanySchema = new mongoose.Schema({
  company_image: { type: String, required: false, default: "ไม่มี" }, //รูป
  company_name: {
    Thai: { type: String, required: false, default: "ไม่มี" },
    Eng: { type: String, required: false, default: "ไม่มี" },
    Cambodia: { type: String, required: false, default: "ไม่มี" },
    Myanmar: { type: String, required: false, default: "ไม่มี" },
    Laos: { type: String, required: false, default: "ไม่มี" },
    China: { type: String, required: false, default: "ไม่มี" },
  },
  company_address: {
    Thai: { type: String, required: false, default: "ไม่มี" },
    Eng: { type: String, required: false, default: "ไม่มี" },
    Cambodia: { type: String, required: false, default: "ไม่มี" },
    Myanmar: { type: String, required: false, default: "ไม่มี" },
    Laos: { type: String, required: false, default: "ไม่มี" },
    China: { type: String, required: false, default: "ไม่มี" },
  }, //รายละเอียด [{eng:test},{thai:ทดสอบ}] ไม่เอา editor แล้ว
});

const Company = mongoose.model("company", CompanySchema);

const validate = (data) => {
  const schema = Joi.object({
    company_image: Joi.string().default("ไม่มี"),
    company_name: Joi.object({
      Thai: Joi.string().default("ไม่มี"),
      Eng: Joi.string().default("ไม่มี"),
      Cambodia: Joi.string().default("ไม่มี"),
      Myanmar: Joi.string().default("ไม่มี"),
      Laos: Joi.string().default("ไม่มี"),
      China: Joi.string().default("ไม่มี"),
    }),
    company_address: Joi.object({
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

module.exports = { Company, validate };
