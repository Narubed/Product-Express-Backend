const express = require("express");
const fs = require("fs");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const { Types, validate } = require("../../models/type.model");

const storeage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images/type");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

exports.create = async (req, res) => {
  const id = req.params.id;
  try {
    let upload = multer({ storage: storeage }).single("type_image");
    upload(req, res, async function (err) {
      if (!req.file) {
        const { error } = validate(req.body);
        if (error)
          return res.status(400).send({ message: error.details[0].message });
        await new Types({
          ...req.body,
        }).save();
        res
          .status(201)
          .send({ message: "สร้างผู้ใช้งานใหม่เเล้ว", status: true });
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      } else {
        console.log("มีไฟล์", req.file);
   
        await new Types({
          ...req.body,
          type_image: req.file.filename,
        }).save();
        res
          .status(201)
          .send({ message: "สร้างผู้ใช้งานใหม่เเล้ว", status: true });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
