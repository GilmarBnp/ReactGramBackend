const express = require("express");
const router = express.Router();

//Controller
const { register, login, getCurrentUser } = require("../controllers/UserController");

//middlewares
const validate = require("../middlewares/handleValidation")
const { userCreateValidations, loginValidation } = require("../middlewares/UseValidations")
const authGuard = require("../middlewares/AuthGuard")
//Routes
router.post("/register", userCreateValidations(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser)

module.exports = router;
