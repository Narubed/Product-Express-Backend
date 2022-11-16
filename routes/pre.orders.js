const router = require("express").Router();
const po = require("../controllers/pre.order.controller");
const update_po = require("../controllers/pre.order.controller/update.pre.order");
const auth = require("../lib/auth");

router.get("/member/:id", auth, po.findByIdMembers);
router.get("/partner/:id", auth, po.findByIdPartner);
router.get("/cut-around/:id", auth, po.findByIdCutAround);

router.put("/:id", auth, update_po.update);

router.post("/", auth, po.create);
router.get("/", auth, po.findAll);
router.get("/:id", auth, po.findOne);
router.delete("/:id", auth, po.delete);

module.exports = router;
