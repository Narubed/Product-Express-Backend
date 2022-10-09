const router = require("express").Router();
const brand = require("../controllers/brand.controller");
const auth = require("../lib/auth");

router.get("/", brand.findAll);
router.get("/:id", brand.findOne);

router.post("/", auth, brand.create);

router.delete("/:id", auth, brand.delete);
router.put("/:id", auth, brand.update);

module.exports = router;
