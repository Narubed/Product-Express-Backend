const router = require("express").Router();
const partners = require("../controllers/partners.controller");
const auth = require("../lib/auth");

router.get("/me/", auth, partners.findMe);

router.post("/", auth, partners.create);
router.get("/", auth, partners.findAll);
router.get("/:id", auth, partners.findOne);
router.delete("/:id", auth, partners.delete);
router.put("/:id", auth, partners.update);

module.exports = router;
