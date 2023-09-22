const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../model/user");
const authMiddleware = require('../authMiddleware'); // Import your auth middleware
const jwt = require('jsonwebtoken');


// Route to add a favorite movie to the user's account
router.post("/:id/:movieId/:movieTitle/:posterUrl", async (req, res) => {
  try {
    const userId = req.params.id;
    const movieId = req.params.movieId;
    const movieTitle = decodeURIComponent(req.params.movieTitle);
    const posterUrl = decodeURIComponent(req.params.posterUrl);
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("Unauthorized, Please log in");
    }

    const token = authHeader.substring(7);

    const user = await User.findOne({ _id: userId, authToken: token });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized or User not found" });
    }

    const apiKey = '372f45cfd5f7b20e54501ddf25b06190';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1`;
    const response = await axios.get(apiUrl);

    if (response.data.results && response.data.results.length > 0) {
      if (user.favorites.some(fav => fav.movieId === movieId)) {
        return res.status(400).json({ error: "Movie exists in list of favorites" });
      }

      user.favorites.push({ movieId, movieTitle, posterUrl });

      await user.save();

      return res.json({ message: `${movieTitle} (ID: ${movieId}) has been added to favorites for ${user.username}` });
    } else {
      return res.status(404).json({ error: "Movie does not exist / Not found" });
    }
  } catch (error) {
    console.error("Error adding favorite movie:", error.message);
    return res.status(500).json({ error: "Failed to add favorite movie" });
  }
});

// Route to delete a favorite movie from the user's account
router.delete("/:id/favorites/:movieId", async (req, res) => {
  try {
    const userId = req.params.id;
    const movieId = req.params.movieId;
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("Unauthorized, Please log in");
    }

    const token = authHeader.substring(7);

    const user = await User.findOne({ _id: userId, authToken: token });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized or User not found" });
    }

    // Find the index of the movie in the favorites array
    const movieIndex = user.favorites.findIndex(fav => fav.movieId === movieId);

    if (movieIndex === -1) {
      return res.status(404).json({ error: "Movie not found in favorites" });
    }

    // Remove the movie from the favorites array
    user.favorites.splice(movieIndex, 1);

    await user.save();

    return res.json({ message: `Movie (ID: ${movieId}) has been removed from favorites for ${user.username}` });
  } catch (error) {
    console.error("Error deleting favorite movie:", error.message);
    return res.status(500).json({ error: "Failed to delete favorite movie" });
  }
});

module.exports = router;
