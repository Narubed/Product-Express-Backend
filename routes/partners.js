const router = require("express").Router();
const partners = require("../controllers/partners.controller");

router.post("/", partners.create);
router.get("/", partners.findAll);
router.get("/:id", partners.findOne);
router.delete("/:id", partners.delete);
router.put("/:id", partners.update);

module.exports = router;
