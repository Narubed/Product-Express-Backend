const router = require("express").Router();
const CartShopping = require("../controllers/cart.shopping.controller");
const auth = require("../lib/auth");

router.post("/", auth, CartShopping.create);
router.get("/", auth, CartShopping.findAll);
router.get("/:id", auth, CartShopping.findOne);
router.delete("/:id", auth, CartShopping.delete);
router.put("/:id", auth, CartShopping.update);

module.exports = router;
