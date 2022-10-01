const router = require("express").Router();
const products = require("../controllers/products.controller");

router.post("/", products.create);
router.get("/", products.findAll);
router.get("/:id", products.findOne);
router.delete("/:id", products.delete);
router.put("/:id", products.update);

module.exports = router;
