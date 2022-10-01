const mongoose = require("mongoose");
const Joi = require("joi");

const WhiteListSchema = new mongoose.Schema({
  whitelistmember_id: { type: String, required: false, default: "ไม่มี" },
  whitelist_detail: { type: Array, require: false, default: [] },
});

const WhiteList = mongoose.model(" whitelist", WhiteListSchema);

const validate = (data) => {
  const schema = Joi.object({
    whitelist_member_id: Joi.string().default("ไม่มี"),
    whitelist_detail: Joi.array().default([]),
  });
  return schema.validate(data);
};

module.exports = { WhiteList, validate };
