const router = require("express").Router();
const whitelist = require("../controllers/whitelist.controller");
const auth = require("../lib/auth");

router.get("/member/", auth, whitelist.findByMember);
router.post("/", auth, whitelist.create);
router.get("/", auth, whitelist.findAll);
router.get("/:id", auth, whitelist.findOne);
router.delete("/:id", auth, whitelist.delete);
router.put("/:id", auth, whitelist.update);

module.exports = router;
