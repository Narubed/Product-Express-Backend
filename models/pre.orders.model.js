const mongoose = require("mongoose");
const Joi = require("joi");

const PreOrdersSchema = new mongoose.Schema({
  po_member_id: { type: String, required: false, default: "ไม่มี" }, //รูป
  po_number: { type: String, require: false, default: "ไม่มี" },
  po_partner_id: { type: String, require: true },
  po_silp: { type: String, require: false, default: "ไม่มี" },
  po_total: { type: Number, require: false, default: 1 },
  po_status: { type: Array, require: false, default: [] }, // [{name:รอตรวจสอบ,timestamp: date}]
  po_detail: { type: Array, require: false, default: [] },
  po_discount: { type: String, require: false, default: "ไม่มี" },
  po_transaction_silp: { type: String, require: false, default: "ไม่มี" },
  po_cutaround_id: { type: String, require: false, default: "ไม่มี" },
});

const PreOrders = mongoose.model("pre_order", PreOrdersSchema);

const validate = (data) => {
  const schema = Joi.object({
    po_member_id: Joi.string().default("ไม่มี"),
    po_number: Joi.string().default("ไม่มี"),
    po_partner_id: Joi.string(),
    po_silp: Joi.string().default("ไม่มี"),
    po_total: Joi.number().precision(3).default(1),
    po_status: Joi.array().default([]),
    po_detail: Joi.array().default([]),
    po_discount: Joi.string().default("ไม่มี"),
    po_transaction_silp: Joi.string().default("ไม่มี"),
    po_cutaround_id: Joi.string().default("ไม่มี"),
  });
  return schema.validate(data);
};

module.exports = { PreOrders, validate };
