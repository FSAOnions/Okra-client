const router = require("express").Router();
const {
  getUserCart,
  addItemToCart,
  deleteItemFromCart,
  checkoutCart,
} = require("../controllers/cartController");
const { requireToken } = require("../../util/tempMiddleware");

router.put("/checkout", requireToken, checkoutCart);
router.get("/:userId/:restaurantId", requireToken, getUserCart);
router.post("/:productId", requireToken, addItemToCart);
router.delete("/:productId", requireToken, deleteItemFromCart);

module.exports = router;
