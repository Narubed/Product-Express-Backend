const router = require("express").Router();
const discounts = require("../controllers/discount.controller");
const auth = require("../lib/auth");

router.post("/", auth, discounts.create);
router.get("/", auth, discounts.findAll);
router.get("/:id", auth, discounts.findOne);
router.delete("/:id", auth, discounts.delete);
router.put("/:id", auth, discounts.update);

module.exports = router;
