const router = require("express").Router();
const company = require("../controllers/company.controller");

router.post("/", company.create);
router.get("/", company.findAll);
router.get("/:id", company.findOne);
router.delete("/:id", company.delete);
router.put("/:id", company.update);

module.exports = router;
