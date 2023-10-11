const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");

router.post("/addToCart", orderControllers.actionAddToCart);

module.exports = router;