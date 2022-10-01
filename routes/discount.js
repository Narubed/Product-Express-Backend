const router = require("express").Router();
const discounts = require("../controllers/discount.controller");

router.post("/", discounts.create);
router.get("/", discounts.findAll);
router.get("/:id", discounts.findOne);
router.delete("/:id", discounts.delete);
router.put("/:id", discounts.update);

module.exports = router;
