const router = require("express").Router();
const members = require("../controllers/members.controller");
const auth = require("../lib/auth");

router.get("/me/", auth, members.findMe);

router.post("/", auth, members.create);
router.get("/", auth, members.findAll);
router.get("/:id", auth, members.findOne);
router.delete("/:id", auth, members.delete);
router.put("/:id", auth, members.update);

module.exports = router;
