const router = require("express").Router();
const members = require("../controllers/members.controller");

router.post("/", members.create);
router.get("/", members.findAll);
router.get("/:id", members.findOne);
router.delete("/:id", members.delete);
router.put("/:id", members.update);

module.exports = router;
