const mongoose = require("mongoose");
const Joi = require("joi");

const TypesSchema = new mongoose.Schema({
  type_image: { type: String, required: false, default: "ไม่มี" }, //รูป
  type_name: {
    Thai: { type: String, required: false, default: "ไม่มี" },
    Eng: { type: String, required: false, default: "ไม่มี" },
    Cambodia: { type: String, required: false, default: "ไม่มี" },
    Myanmar: { type: String, required: false, default: "ไม่มี" },
    Laos: { type: String, required: false, default: "ไม่มี" },
    China: { type: String, required: false, default: "ไม่มี" },
  },
});

const Types = mongoose.model("type", TypesSchema);

const validate = (data) => {
  const schema = Joi.object({
    type_image: Joi.string().default("ไม่มี"),
    type_name: Joi.object({
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

module.exports = { Types, validate };
