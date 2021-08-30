const router = require("express").Router();
const {
  getUserOrder,
  addItemToOrder,
  deleteItemFromOrder,
  orderFood,
} = require("../controllers/orderController");
const { requireToken } = require("../util/apiMiddleware");

router.put("/orderFood", requireToken, orderFood);
router.get("/:userId/:restaurantId", requireToken, getUserOrder);
router.post("/:productId", requireToken, addItemToOrder);
router.delete("/:productId", requireToken, deleteItemFromOrder);

module.exports = router;
