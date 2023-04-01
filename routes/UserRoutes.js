const express = require("express");
const router = express.Router();

//Controller
const { register, login, getCurrentUser, update, getUserById } = require("../controllers/UserController");

//middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidations, loginValidation, userUpdateValidation} = require("../middlewares/UseValidations")
const authGuard = require("../middlewares/AuthGuard");
const { imageUpload } = require("../middlewares/ImageUpload");

//Routes
router.post("/register", userCreateValidations(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/",authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);
router.get("/:id", getUserById);



module.exports = router;