const express = require("express");
const fs = require("fs");
const router = express.Router();
const multer = require("multer");

const auth = require("../lib/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images/partners");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});
// const upload = multer({ storage: storage });

router.post("/", auth, async function (req, res) {
  try {
    // console.log(req.file);
    let upload = multer({ storage: storage }).fields([
      { name: "partner_card_image", maxCount: 10 },
      { name: "partner_bookbank_image", maxCount: 10 },
    ]);
    upload(req, res, async function (err) {
      console.log(req.file);
      if (!req.files) {
        res.status(201).send({ message: "ไม่มีรูปภาพ", status: true });
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      } else {
        console.log("มีไฟล์", req.files);
        res.status(201).send({
          message: "สร้างรูปภาพแล้ว",
          status: true,
          cardImage: req.files.partner_card_image[0].filename,
          bookbankImage: req.files.partner_bookbank_image[0].filename,
        });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
});

router.delete("/", async function (req, res) {
  const fileName = req.body.images;
  try {
    fs.unlink("src/images/partners/" + fileName, function (err) {
      if (err && err.code == "ENOENT") {
        console.log(err);
        // file doens't exist
        return res.status(400).send({ message: "ไม่มีไฟล์ที่ต้องการลบ." });
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        return res.status(400).send({ message: "ไม่สามารถลบไฟล์นี้ได้." });
      } else {
        return res.status(201).send({ message: "removed susscess" });
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
