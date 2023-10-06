const express = require("express");

const {
  renderLogin,
  renderRegister,
  registerUser,
  login,
  logout,
} = require("../controllers/userControllers.js");

const validateRegister = require("../middlewares/validateRegister.js");
//const validateLogin = require("../middlewares/validateLogin.js");
const router = express.Router();

//router.get("/login", renderLogin);
router.post("/login", login);
//router.get("/register", renderRegister);
router.post("/register", registerUser);
router.get("/logout", logout);

module.exports = router;
