const router = require("express").Router();
const brand = require("../controllers/brand.controller");

router.post("/", brand.create);
router.get("/", brand.findAll);
router.get("/:id", brand.findOne);
router.delete("/:id", brand.delete);
router.put("/:id", brand.update);

module.exports = router;
