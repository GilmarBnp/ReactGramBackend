const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema (
    {
        name: String,
        email: String,
        gender: String,
        password: String,
        profileImage: String,
        bio: String, 
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

