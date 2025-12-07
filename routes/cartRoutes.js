const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/authMiddleware");

router.post("/add", cartController.addToCart);
router.get("/", cartController.getCart);
router.post("/checkout", cartController.checkout);


module.exports = router;
