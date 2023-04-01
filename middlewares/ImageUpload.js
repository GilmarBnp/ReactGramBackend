const multer = require("multer");
const path = require("path");
const uploads = "http://localhost:5000/uploads"
const Photo = require("../models/Photo")
const fs = require('fs');

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: async function(req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },

});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // uploud only png or jpg formats
      return cb(
        new Error("Por favor, envie apenas imagem no formato png, jpg ou jpeg.")
      );
    }
 
    cb(undefined, true);
  },
});

module.exports = { imageUpload };