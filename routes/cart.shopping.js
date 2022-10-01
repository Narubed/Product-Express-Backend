const router = require("express").Router();
const CartShopping = require("../controllers/cart.shopping.controller");

router.post("/", CartShopping.create);
router.get("/", CartShopping.findAll);
router.get("/:id", CartShopping.findOne);
router.delete("/:id", CartShopping.delete);
router.put("/:id", CartShopping.update);

module.exports = router;
