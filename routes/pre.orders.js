const router = require("express").Router();
const po = require("../controllers/pre.order.controller");
const update_po = require("../controllers/pre.order.controller/update.pre.order");

router.put("/:id", update_po.update);

router.post("/", po.create);
router.get("/", po.findAll);
router.get("/:id", po.findOne);
router.delete("/:id", po.delete);

module.exports = router;
