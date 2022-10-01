const router = require("express").Router();
const whitelist = require("../controllers/whitelist.controller");

router.post("/", whitelist.create);
router.get("/", whitelist.findAll);
router.get("/:id", whitelist.findOne);
router.delete("/:id", whitelist.delete);
router.put("/:id", whitelist.update);

module.exports = router;
