const router = require("express").Router();
const cutAround = require("../controllers/cut.around.controller");
const auth = require("../lib/auth");

router.post("/", auth, cutAround.create);
router.get("/", auth, cutAround.findAll);
router.get("/:id", auth, cutAround.findOne);
router.delete("/:id", auth, cutAround.delete);
router.put("/:id", auth, cutAround.update);

module.exports = router;
