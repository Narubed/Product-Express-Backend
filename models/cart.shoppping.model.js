const mongoose = require("mongoose");
const Joi = require("joi");

const CartShoppingSchema = new mongoose.Schema({
  shopping_member_id: { type: String, required: false, default: "ไม่มี" },
  shopping_detail: { type: Array, require: false, default: [] },
});

const CartShopping = mongoose.model("cart_shopping", CartShoppingSchema);

const validate = (data) => {
  const schema = Joi.object({
    shopping_member_id: Joi.string().default("ไม่มี"),
    shopping_detail: Joi.array().default([]),
  });
  return schema.validate(data);
};

module.exports = { CartShopping, validate };
