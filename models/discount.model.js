const mongoose = require("mongoose");
const Joi = require("joi");

const DiscountSchema = new mongoose.Schema({
  discount_name: {
    Thai: { type: String, required: false, default: "ไม่มี" },
    Eng: { type: String, required: false, default: "ไม่มี" },
    Cambodia: { type: String, required: false, default: "ไม่มี" },
    Myanmar: { type: String, required: false, default: "ไม่มี" },
    Laos: { type: String, required: false, default: "ไม่มี" },
    China: { type: String, required: false, default: "ไม่มี" },
  },
  discount_code: { type: String, require: true },
  discount_type: { type: String, require: false, default: "จำนวน" }, // จำนวน,เปอร์เซ็น
  discount_detail: { type: Array, require: false, default: [] },
  discount_amount: { type: Number, require: false, default: 0 },
  discount_date_start: { type: Date, required: false, default: Date.now() },
  discount_date_end: { type: Date, required: false, default: Date.now() },
});

const Discount = mongoose.model("discount", DiscountSchema);

const validate = (data) => {
  const schema = Joi.object({
    discount_name: Joi.object({
      Thai: Joi.string().default("ไม่มี"),
      Eng: Joi.string().default("ไม่มี"),
      Cambodia: Joi.string().default("ไม่มี"),
      Myanmar: Joi.string().default("ไม่มี"),
      Laos: Joi.string().default("ไม่มี"),
      China: Joi.string().default("ไม่มี"),
    }),
    discount_code: Joi.string(),
    discount_type: Joi.string().default("จำนวน"),
    discount_detail: Joi.array().default([]),
    discount_amount: Joi.number().default(0),
    discount_date_start: Joi.date().raw().default(Date.now()),
    discount_date_end: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { Discount, validate };
