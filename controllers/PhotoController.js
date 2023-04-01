const Photo = require("../models/Photo")
const User = require("../models/User")
const fs = require('fs')


const mongoose = require("mongoose")

// Insert a photo, with an user related to it
const insertPhoto = async(req,res)=> {
    const { title } = req.body;
    const image =  req.file.filename;

    reqUser = req.user;

    const user = await User.findById(reqUser._id);

    // Create a photo
    const newPhoto = await Photo.create ({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    // if a photo was created sucessfully return a data
    if(!newPhoto) {
            
        res.status(422).json({errors: ["Houve um problema por favor tente mais tarde."]})
    }

    res.status(200).json(newPhoto);

}

const deletePhoto = async(req, res) => {
    const { id } = req.params

    const reqUser = req.user

    try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))
    //foi feito uma busca no db, mas a foto não foi encontrada
    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada!"]});
        return;
    }
    
    // Check if belongs to user
    if(!photo.userId.equals(reqUser._id)) {
        res.status(422).json({errors: ["Ocorreu um erro, por favor tente mais tarde."]})
    }

    await Photo.findByIdAndDelete(photo._id)

    try {   
        await fs.unlink(`./uploads/photos/${photo.image}`,function(err){
            
            if(err) return console.log(err);     
       });  
       
        res.status(200).json({imagem: photo.image, message: "Foto excluída com sucesso!"})

      } catch (error) {
        console.error(error);
      }
    
    } catch (error) {
           //foi digitado um id fora do padrão
            res.status(404).json({errors: ["Id não reconhecido."]});
            return;  
    }
}

// Get all photos
const getAllPhotos = async(req, res) => {
    const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec()
    return res.status(200).json(photos)
}
// Get user photos
const getUserPhotos = async(req, res) => {
    const {id} = req.params

    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec();
    return res.status(200).json(photos);
}

// Get photo by id
const getPhotoById = async (req, res) => {

    const {id} = req.params
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    // Check if photo exists
    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada."]})
        return;
    }

    res.status(200).json(photo)
}

// Update a photo
  const updatePhoto = async (req, res) => {
    const {id} = req.params
    const {title} = req.body

    let image;

    if (req.file) {
      image = req.file.filename;
    }

    reqUser = req.user

    const photo = await Photo.findById(id);

    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
  
    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }
  
    if (title) {
      photo.title = title;
    }
  
    if (image) {
      photo.image = image;
    }
  
    await photo.save();
  
    res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
  };

// Like functionality
const likePhoto = async(req, res) => {
    const {id} = req.params

    reqUser = req.user

    const currentUser = await User.findById(mongoose.Types.ObjectId(reqUser._id))
    const photo = await Photo.findById(id)

    // Check if photo exist
    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada"]})
        return;
    }

  // If the user click again, remove like
    if(photo.likes.includes(currentUser._id)) {
     const othersLike = await photo.likes.filter((like) => {//this const take all likes of the photo on photo like array
     return !currentUser.equals(currentUser._id)//return all others likes except for currentUser like, returns all likes less a own user like
    })

     photo.likes = [...othersLike]//put back a photo.likes array in a initial state, no likes
        
     photo.save();//save the initial state, without userPhoto id
        
     return res.status(200).json({photo, message: "Foto descurtida."})
    }

    // Put a user id in likes array
     photo.likes.push(currentUser._id);

     photo.save();

    res.status(200).json({
        photoId: id, 
        userId: reqUser._id, 
        userName: currentUser.userName, 
        message:"Foto curtida."
    })
}

// Comment funcionality
const photoComment = async(req, res) => {
    const {id} = req.params
    const {comment} = req.body

    reqUser = req.user

    const user = await User.findById(reqUser._id)//id from current user request
    const photo = await Photo.findById(id)//id of photo params url

    // Check if the photos exist
    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada."]});
        return;
    }

    // Put a comment in a arrays of comments
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(userComment)
    await photo.save()

    res.status(200).json({comment: userComment, message:"O comentário foi adicionado com sucesso."})
}

    // Search photos by title
    const searchPhotos = async(req, res) => {
        const {q} = req.query

        const photo = await Photo.find({title: new RegExp(q, "i")}).exec()
        res.status(200).json(photo)
    }

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    photoComment,
    searchPhotos,
}