const router = require("express").Router();
const admins = require("../controllers/admin.controller");
const authAdmin = require("../lib/auth-admin");
router.post("/", admins.create);
router.get("/me/", authAdmin, admins.findMe);

router.get("/", admins.findAll);
router.get("/:id", admins.findOne);
router.get("/email/:id", admins.findByEmail);

router.delete("/:id", admins.delete);
router.put("/:id", admins.update);

module.exports = router;
