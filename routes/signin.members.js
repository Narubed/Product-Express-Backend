const router = require("express").Router();
const { Members } = require("../models/members.model");
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
    let members = await Members.findOne({
      members_email: req.body.email,
    });

    if (!members) {
      return res.status(401).send({
        message: "อีเมลผิด",
        status: false,
      });
    }
    const validPasswordMembers = await bcrypt.compare(
      req.body.password,
      members.members_password
    );
    if (!validPasswordMembers)
      // รหัสไม่ตรง
      return res.status(401).send({
        message: "รหัสผ่านผิด",
        status: false,
      });

    const token = members.generateAuthToken();
    const ResponesData = {
      members_name: members.members_name,
      members_email: members.members_email,
    };
    console.log(ResponesData);
    res.status(200).send({
      token: token,
      message: "เข้าสู่ระบบสำเร็จ",
      members: ResponesData,
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
