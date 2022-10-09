const router = require("express").Router();
const types = require("../controllers/type.controller");
const auth = require("../lib/auth");

router.get("/", types.findAll);
router.get("/:id", types.findOne);

router.post("/", auth, types.create);
router.delete("/:id", auth, types.delete);
router.put("/:id", auth, types.update);

module.exports = router;
