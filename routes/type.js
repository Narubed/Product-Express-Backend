const router = require("express").Router();
const types = require("../controllers/type.controller");

router.post("/", types.create);
router.get("/", types.findAll);
router.get("/:id", types.findOne);
router.delete("/:id", types.delete);
router.put("/:id", types.update);

module.exports = router;
