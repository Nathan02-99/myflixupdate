const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../model/user");

// Route to add a favorite movie to the user's account
router.post("/:id/:movieTitle", async (req, res) => {
  try {
    const userId = req.params.id; // Retrieve the user ID from the request
    const movieTitle = req.params.movieTitle; // Retrieve the movie title from the request

    // Check if the movie exists in the external API
    const apiKey ='372f45cfd5f7b20e54501ddf25b06190'; 
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1`;
    const response = await axios.get(apiUrl);

    // Check if any movie matches the provided title
    if (response.data.results && response.data.results.length > 0) {
      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

     // Check if the movie title is already in the user's favorites
    if (user.favorites.includes(movieTitle)) {
       return res.status(400).json({ error: "Movie exists in list of favorites" });
      }

      // Add the movie title to the user's favorites array
      user.favorites.push(movieTitle);

      // Save the updated user data
      await user.save();

      return res.json({ message: ` '${movieTitle}' has been added to favorites for '${user.username}'` });
    } else {
      return res.status(404).json({ error: "Movie does not exist / Not found" });
    }
  } catch (error) {
    console.error("Error adding favorite movie:", error.message);
    return res.status(500).json({ error: "Failed to add favorite movie" });
  }})


// Route to delete a favorite movie from the user's account
router.delete("/:id/:movieTitle", async (req, res) => {
  try {
    const userId = req.params.id; // Retrieve the user ID from the request
    const movieTitle = req.params.movieTitle; // Retrieve the movie title from the request

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the movie title is in the user's favorites
    if (!user.favorites.includes(movieTitle)) {
      return res.status(400).json({ error: "Movie does not exist in favorites" });
    }

    // Remove the movie title from the user's favorites array
    user.favorites = user.favorites.filter((title) => title !== movieTitle);

    // Save the updated user data
    await user.save();

    return res.json({ message: `Movie '${movieTitle}' removed from favorites for user '${user.username}'` });
  } catch (error) {
    console.error("Error removing favorite movie:", error.message);
    return res.status(500).json({ error: "Failed to remove favorite movie" });
  }
});

module.exports = router;
