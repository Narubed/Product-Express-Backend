const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const { Members, validate } = require("../../models/members.model");
const { decode } = require("punycode");

exports.findAll = async (req, res) => {
  try {
    Members.find()
      .then(async (data) => {
        res.send({ data, message: "success", status: true });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "มีบางอย่างผิดพลาด",
        });
      });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    Members.findById(id)
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: "ไม่สามารถหาสินค้าชิ้นนี้ได้", status: false });
        else res.send({ data, status: true });
      })
      .catch((err) => {
        res.status(500).send({
          message: "มีบางอย่างผิดพลาด",
          status: false,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    Members.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
        console.log(data);
        if (!data) {
          res.status(404).send({
            message: `ไม่สามารถลบสินค้านี้ได้`,
            status: false,
          });
        } else {
          res.send({
            message: "ลบสินค้านี้เรียบร้อยเเล้ว",
            status: true,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "ไม่สามารถลบสินค้านี้ได้",
          status: false,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "ไม่สามารถลบผู้ใช้งานนี้ได้",
      status: false,
    });
  }
};
exports.update = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "ส่งข้อมูลผิดพลาด",
      });
    }
    const id = req.params.id;
    if (!req.body.members_password) {
      Members.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `ไม่สามารถเเก้ไขผู้ใช้งานนี้ได้`,
              status: false,
            });
          } else
            res.send({
              message: "แก้ไขผู้ใช้งานนี้เรียบร้อยเเล้ว",
              status: true,
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: "มีบ่างอย่างผิดพลาด" + id,
            status: false,
          });
        });
    } else {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.members_password, salt);
      Members.findByIdAndUpdate(
        id,
        { ...req.body, members_password: hashPassword },
        { useFindAndModify: false }
      )
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `ไม่สามารถเเก้ไขผู้ใช้งานนี้ได้`,
              status: false,
            });
          } else
            res.send({
              message: "แก้ไขผู้ใช้งานนี้เรียบร้อยเเล้ว",
              status: true,
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: "ไม่สามารถเเก้ไขผู้ใช้งานนี้ได้",
            status: false,
          });
        });
    }
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
exports.create = async (req, res) => {
  console.log(req.body);
  try {
    const { error } = validate(req.body);

    if (error)
      return res
        .status(400)
        .send({ message: error.details[0].message, status: false });

    const user = await Members.findOne({
      members_email: req.body.members_email,
    });
    console.log(user);
    if (user)
      return res.status(409).send({
        status: false,
        message: "มีชื่อผู้ใช้งานนี้ในระบบเเล้ว",
      });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.members_password, salt);

    await new Members({
      ...req.body,
      members_password: hashPassword,
    }).save();
    res.status(201).send({ message: "สร้างข้อมูลสำเร็จ", status: true });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};

exports.findMe = async (req, res) => {
  const { decoded } = req;
  try {
    Members.findOne({ _id: decoded._id })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "ไม่สามารถหาผู้ใช้งานนี้ได้", status: false });
        } else {
          const newAdmin = {
            _id: data._id,
            members_name: data.members_name,
            members_image: data.members_image,
            members_email: data.members_email,
            members_phone: data.members_phone,

            members_address1: data.members_address1,
            members_address2: data.members_address2,
            members_city: data.members_city,
            members_zip: data.members_zip,
            members_nationality: data.members_nationality,
          };
          res.status(201).send({ user: newAdmin, status: true });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "มีบางอย่างผิดพลาด",
          status: false,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};

exports.changePassword = async (req, res) => {
  const { decoded } = req;
  try {
    const plaintextPassword = req.body.password;
    const result = await Members.findOne({ _id: decoded._id });
    const password = result.members_password;
    comparePassword(plaintextPassword, password).then(async (status) => {
      if (status) {
        const id = decoded._id;
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
        Members.findByIdAndUpdate(
          id,
          { members_password: hashPassword },
          { useFindAndModify: false }
        ).then((data) => {
          if (!data) {
            res.status(401).send({
              message: `can't change password`,
              status: false,
            });
          } else
            res.status(200).send({
              message: "change password susscess",
              status: true,
            });
        });
      } else {
        res.status(400).send({
          message: "can't change password",
          status: false,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};

async function comparePassword(plaintextPassword, password) {
  const result = await bcrypt.compare(plaintextPassword, password);
  return result;
}
