const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    secondname: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    username: {
        type: String,
        required: true,
        min: 4,
        max: 255,
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024,
    },

    date: {
        type: String,
        default: Date.now,
    },

    favorites: [{
        movieId: { type: String, required: true },
        movieTitle: { type: String, required: true },
        posterUrl: { type: String, required: true } 
    }],

    authToken: {
        type: String,
      },
})

module.exports = mongoose.model("Users", userSchema);