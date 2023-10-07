const express = require("express");

const {  
  registerUser,
  login,
  logout,
} = require("../controllers/userControllers.js");

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/logout", logout);

module.exports = router;
