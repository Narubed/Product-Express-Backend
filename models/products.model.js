const mongoose = require("mongoose");
const Joi = require("joi");

const ProductSchema = new mongoose.Schema({
  product_images: { type: Array, required: false }, //ชื่อ
  product_name: {
    Thai: { type: String, required: false, default: "ไม่มี" },
    Eng: { type: String, required: false, default: "ไม่มี" },
    Cambodia: { type: String, required: false, default: "ไม่มี" },
    Myanmar: { type: String, required: false, default: "ไม่มี" },
    Laos: { type: String, required: false, default: "ไม่มี" },
    China: { type: String, required: false, default: "ไม่มี" },
  }, //ชื่อ [{eng:test},{thai:ทดสอบ}]
  product_detail: {
    Thai: { type: String, required: false, default: "ไม่มี" },
    Eng: { type: String, required: false, default: "ไม่มี" },
    Cambodia: { type: String, required: false, default: "ไม่มี" },
    Myanmar: { type: String, required: false, default: "ไม่มี" },
    Laos: { type: String, required: false, default: "ไม่มี" },
    China: { type: String, required: false, default: "ไม่มี" },
  }, //รายละเอียด [{eng:test},{thai:ทดสอบ}] ไม่เอา editor แล้ว
  product_size_name: {
    Thai: { type: String, required: false, default: "ไม่มี" },
    Eng: { type: String, required: false, default: "ไม่มี" },
    Cambodia: { type: String, required: false, default: "ไม่มี" },
    Myanmar: { type: String, required: false, default: "ไม่มี" },
    Laos: { type: String, required: false, default: "ไม่มี" },
    China: { type: String, required: false, default: "ไม่มี" },
  }, //รายละเอียด [{eng:test},{thai:ทดสอบ}]
  product_size_detail: { type: Array, required: false }, // [{name:{eng:"small", thai:"ชุดเล็ก"}, price: 100, cost: 40, old_price:120, nba: 20, stock: 200, timestamp}]
  product_brand_id: { type: String, required: false, default: "ไม่มี" },
  product_status: { type: Boolean, required: true },
  product_type_id: { type: Array, required: false, default: [] },
  product_tag: { type: String, required: false, default: "ไม่มี" }, // tag:"ลดพิเศษ"
  product_timestamp: { type: Date, required: false, default: Date.now() },
});

const Products = mongoose.model("product", ProductSchema);

const validate = (data) => {
  const schema = Joi.object({
    product_images: Joi.array().default([]),
    product_name: Joi.object({
      Thai: Joi.string().default("ไม่มี"),
      Eng: Joi.string().default("ไม่มี"),
      Cambodia: Joi.string().default("ไม่มี"),
      Myanmar: Joi.string().default("ไม่มี"),
      Laos: Joi.string().default("ไม่มี"),
      China: Joi.string().default("ไม่มี"),
    }),
    product_detail: Joi.object({
      Thai: Joi.string().default("ไม่มี"),
      Eng: Joi.string().default("ไม่มี"),
      Cambodia: Joi.string().default("ไม่มี"),
      Myanmar: Joi.string().default("ไม่มี"),
      Laos: Joi.string().default("ไม่มี"),
      China: Joi.string().default("ไม่มี"),
    }),
    product_size_name: Joi.object({
      Thai: Joi.string().default("ไม่มี"),
      Eng: Joi.string().default("ไม่มี"),
      Cambodia: Joi.string().default("ไม่มี"),
      Myanmar: Joi.string().default("ไม่มี"),
      Laos: Joi.string().default("ไม่มี"),
      China: Joi.string().default("ไม่มี"),
    }),
    product_size_detail: Joi.array().default([]),
    product_brand_id: Joi.string().default("ไม่มี"),
    product_status: Joi.boolean(),
    product_type_id: Joi.array().default([]),
    product_tag: Joi.string(),
    product_timestamp: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { Products, validate };
