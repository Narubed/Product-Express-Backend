const router = require("express").Router();
const cutAround = require("../controllers/cut.around.controller");

router.post("/", cutAround.create);
router.get("/", cutAround.findAll);
router.get("/:id", cutAround.findOne);
router.delete("/:id", cutAround.delete);
router.put("/:id", cutAround.update);

module.exports = router;
