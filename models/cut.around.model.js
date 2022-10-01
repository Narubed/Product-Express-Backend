const mongoose = require("mongoose");
const Joi = require("joi");

const CutAroundSchema = new mongoose.Schema({
  cutaround_partner_id: { type: String, required: false, default: "ไม่มี" },
  cutaround_transaction: { type: String, required: false, default: "ไม่มี" }, // ผู้ทำรายการ
  cutaround_timestamp: { type: Date, required: false, default: Date.now() },
});

const CutAround = mongoose.model("cut_around", CutAroundSchema);

const validate = (data) => {
  const schema = Joi.object({
    cutaround_partner_id: Joi.string().default("ไม่มี"),
    cutaround_transaction: Joi.string().default("ไม่มี"), // ผู้ทำรายการ
    cutaround_timestamp: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { CutAround, validate };
