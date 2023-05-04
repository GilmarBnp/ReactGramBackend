const express = require("express");
const router = express.Router();

// Controller
const { insertPhoto, deletePhoto, getAllPhotos, 
        getUserPhotos, getPhotoById, updatePhoto, 
        likePhoto, photoComment, searchPhotos, getPhotoLikes, 
        getPhotoLikesAll } = require("../controllers/PhotoController")

// Middlewares
const { photoInsertValidation, photoUpdateValidation, 
        photoCommentValidation } = require("../middlewares/PhotoValidations");
const authGuard = require("../middlewares/AuthGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/ImageUpload");

// Routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/",authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/search", searchPhotos);
router.get("/likes/:id", getPhotoLikes);
router.get("/likes", getPhotoLikesAll);

router.get("/:id", getPhotoById);
router.put("/:id", authGuard, imageUpload.single("image"), photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto)
router.put("/comment/:id", authGuard, photoCommentValidation(), validate, photoComment);

module.exports = router;