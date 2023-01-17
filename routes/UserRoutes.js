const express = require("express");
const router = express.Router();

//Controller
const { register } = require("../controllers/UserController");

//middlewares
const validate = require("../middlewares/handleValidation")
const { userCreateValidations } = require("../middlewares/UseValidations")

//Routes
router.post("/register", userCreateValidations(), validate, register);

module.exports = router;
