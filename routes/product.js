const router = require("express").Router();
const products = require("../controllers/products.controller");
const auth = require("../lib/auth");

router.get("/", products.findAll);
router.get("/:id", products.findOne);

router.post("/", auth, products.create);

router.delete("/:id", auth, products.delete);
router.put("/:id", auth, products.update);

module.exports = router;
