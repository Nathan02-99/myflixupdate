const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../model/user");
const authMiddleware = require('../authMiddleware'); // Import your auth middleware
const jwt = require('jsonwebtoken');


// Route to add a favorite movie to the user's account
router.post("/:id/:movieTitle", async (req, res) => {
  try {
    const userId = req.params.id; // Retrieve the user ID from the request
    const movieTitle = req.params.movieTitle; // Retrieve the movie title from the request
    const authHeader = req.header('Authorization');

    // If the auth header is not present, return an error
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("Unauthorized, Please log in");
    }

    const token = authHeader.substring(7); // Extract token from the "Bearer " prefix

    // Find the user by ID and auth token
    const user = await User.findOne({ _id: userId, authToken: token });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized or User not found" });
    }

    // Check if the movie exists in the external API
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; 
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1`;
    const response = await axios.get(apiUrl);

    // Check if any movie matches the provided title
    if (response.data.results && response.data.results.length > 0) {
      // Check if the movie title is already in the user's favorites
      if (user.favorites.includes(movieTitle)) {
        return res.status(400).json({ error: "Movie exists in list of favorites" });
      }

      // Add the movie title to the user's favorites array
      user.favorites.push(movieTitle);

      // Save the updated user data
      await user.save();

      return res.json({ message: `${movieTitle} has been added to favorites for ${user.username}` });
    } else {
      return res.status(404).json({ error: "Movie does not exist / Not found" });
    }
  } catch (error) {
    console.error("Error adding favorite movie:", error.message);
    return res.status(500).json({ error: "Failed to add favorite movie" });
  }
});

// Route to delete a favorite movie from the user's account
router.delete("/:id/:movieTitle", async (req, res) => {
  try {
    const userId = req.params.id; // Retrieve the user ID from the request
    const movieTitle = req.params.movieTitle; // Retrieve the movie title from the request
    const authHeader = req.header('Authorization');

    // If the auth header is not present, return an error
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("Unauthorized");
    }

    const token = authHeader.substring(7); // Extract token from the "Bearer " prefix

    // Find the user by ID and auth token
    const user = await User.findOne({ _id: userId, authToken: token });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized or User not found" });
    }

    // Check if the movie title is in the user's favorites
    if (!user.favorites.includes(movieTitle)) {
      return res.status(400).json({ error: "Movie does not exist in favorites" });
    }

    // Remove the movie title from the user's favorites array
    user.favorites = user.favorites.filter((title) => title !== movieTitle);

    // Save the updated user data
    await user.save();

    return res.json({ message: `${movieTitle} removed from favorites for ${user.username}` });
  } catch (error) {
    console.error("Error removing favorite movie:", error.message);
    return res.status(500).json({ error: "Failed to remove favorite movie" });
  }
});

module.exports = router;
