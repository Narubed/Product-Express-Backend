const router = require("express").Router();

const invoicePreOrderNumber = require("../controllers/invoice.tax.controller/pre.order.number");
const auth = require("../lib/auth");

router.post("/preorder-number", invoicePreOrderNumber.create);

module.exports = router;
