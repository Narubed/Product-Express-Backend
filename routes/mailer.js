const router = require("express").Router();
const nodemailer = require("nodemailer");
const Joi = require("joi");
require("dotenv").config();
// partner_username
// emp_password

router.post("/", async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "yourmail@hotmail.com", // your email
        pass: "password", // your email password
      },
    });

    const mailData = {
      from: "it@nbadigitalworlds.com", // sender address
      to: "programmer@nbadigitalworlds.com", // list of receivers
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      html: `<b>Hey there! </b>
                 <br> This is our first message sent with Nodemailer<br/>`,
    };
    console.log(mailData);
    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });

    return res.status(201).send({ message: "ส่งสำเร็จ" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// const validate = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().required().label("email"),
//     password: Joi.string().required().label("password"),
//   });
//   return schema.validate(data);
// };

module.exports = router;
