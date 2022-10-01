const express = require("express");
const fs = require("fs");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const { PreOrders, validate } = require("../../models/pre.orders.model");

const storeage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images/pre-order");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    let upload = multer({ storage: storeage }).single("po_silp");
    upload(req, res, async function (err) {
      if (!req.file) {
        PreOrders.findByIdAndUpdate(
          id,
          { ...req.body },
          { useFindAndModify: false }
        )
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `ไม่สามารถเเก้ไขข้อมูลนี้ได้`,
                status: false,
              });
            } else
              res.send({
                message: "แก้ไขข้อมูลนี้เรียบร้อยเเล้ว",
                status: true,
              });
          })
          .catch((err) => {
            res.status(500).send({
              message: "มีบ่างอย่างผิดพลาด",
              status: false,
            });
          });
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      } else {
        console.log("มีไฟล์", req.file);
        PreOrders.findByIdAndUpdate(
          id,
          { ...req.body, po_silp: req.file.filename },
          { useFindAndModify: false }
        )
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `ไม่สามารถเเก้ไขข้อมูลนี้ได้`,
                status: false,
              });
            } else
              res.send({
                message: "แก้ไขข้อมูลนี้เรียบร้อยเเล้ว",
                status: true,
              });
          })
          .catch((err) => {
            res.status(500).send({
              message: "มีบ่างอย่างผิดพลาด",
              status: false,
            });
          });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
