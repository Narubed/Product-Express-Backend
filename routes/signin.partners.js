const router = require("express").Router();
const { Partners } = require("../models/partners.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
require("dotenv").config();
// partner_username
// emp_password

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    let partner = await Partners.findOne({
      partner_email: req.body.email,
    });

    if (!partner) {
      return res.status(401).send({
        message: "อีเมลผิด",
        status: false,
      });
    }
    const validPasswordPartner = await bcrypt.compare(
      req.body.password,
      partner.partner_password
    );
    if (!validPasswordPartner)
      // รหัสไม่ตรง
      return res.status(401).send({
        message: "รหัสผ่านผิด",
        status: false,
      });

    const token = partner.generateAuthToken();

    const ResponesData = {
      partner_name: partner.partner_name,
      partner_email: partner.partner_email,
    };
    console.log(ResponesData);
    res.status(200).send({
      token: token,
      message: "เข้าสู่ระบบสำเร็จ",
      partner: ResponesData,
      status: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = router;
