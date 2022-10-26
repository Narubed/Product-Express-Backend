const dayjs = require("dayjs");
const { PreOrders, validate } = require("../../models/pre.orders.model");

exports.create = async (req, res) => {
  try {
    PreOrders.find().then((value) => {
      if (!value) {
        res.send({
          status: true,
          invoice_preorder: `${dayjs(req.body.date).format("YYYYMM")}000001`,
        });
      } else {
        const findDate = value.filter(
          (item) =>
            dayjs(item.po_timestamp[0].timestamp).format("MM/YYYY") ===
            dayjs(req.body.date).format("MM/YYYY")
        );
        if (findDate.length < 9) {
          res.send({
            status: true,
            invoice_preorder: `${dayjs(req.body.date).format("YYYYMM")}00000${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 99) {
          res.send({
            status: true,
            invoice_preorder: `${dayjs(req.body.date).format("YYYYMM")}0000${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 999) {
          res.send({
            status: true,
            invoice_preorder: `${dayjs(req.body.date).format("YYYYMM")}000${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 9999) {
          res.send({
            status: true,
            invoice_preorder: `${dayjs(req.body.date).format("YYYYMM")}00${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 99999) {
          res.send({
            status: true,
            invoice_preorder: `${dayjs(req.body.date).format("YYYYMM")}0${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 999999) {
          res.send({
            status: true,
            invoice_preorder: `${dayjs(req.body.date).format("YYYYMM")}${
              findDate.length + 1
            }`,
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};
