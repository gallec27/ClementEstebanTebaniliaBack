const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");

router.post("/addToCart", orderControllers.actionAddToCart);
router.get("/getOrder", orderControllers.getOrder);
router.post("/delete", orderControllers.actionDeleteFromCart);
router.post("/deleteCart", orderControllers.actionDeleteCart);

module.exports = router;