const express = require("express")
const app = express()
const mongoose = require('mongoose');
require('dotenv').config();
const axios = require("axios");

app.use(express.json());

app.get("/", (req,res) => {
  res.send('welcome to my api')
})

const mongoURI = 'mongodb://localhost:27017/myflix';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your server or begin other tasks after successful connection
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


// import routes
const userRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const logoutRoute = require("./routes/logout");
const favoritesRoute = require("./routes/favorites");

app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/logout",logoutRoute)
app.use("/api/favorites", favoritesRoute);

// Define a new route to get all movies from an tmdb API
app.get("/api/movies", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; // Replace this with your API key
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    // Make the API call to fetch movie data
    const response = await axios.get(apiUrl);
    const movies = response.data.results;

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ error: "Failed to fetch movies " });
  }
});

// Define a new route to get one movie from an tmdb API
app.get("/api/movies/:movieTitle", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; 
    const movieTitle = req.params.movieTitle; // Retrieve the movie title from the request

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1`;

    // Make the API call to search for the movie by its title
    const response = await axios.get(apiUrl);

    // Check if any movie matches the provided title
    if (response.data.results && response.data.results.length > 0) {
      const movie = response.data.results[0];
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error.message);
    res.status(500).json({ error: "Failed to fetch movie " });
  }
});



// Define a Mongoose schema for genres
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

// Create a Mongoose model for genres
const Genre = mongoose.model('Genre', genreSchema);

// Define a new route to get the description of a genre from the database
app.get("/api/genre/:genreName", async (req, res) => {
  try {
    const genreName = req.params.genreName.toLowerCase();

    // Find the genre in the database by name
    const genre = await Genre.findOne({ name: genreName });

    if (genre) {
      res.json({
        name: genre.name,
        description: genre.description,
      });
    } else {
      res.status(404).json({ error: "Genre not found" });
    }
  } catch (error) {
    console.error("Error fetching genre description:", error.message);
    res.status(500).json({ error: "Failed to fetch genre description" });
  }
});

// Define a new route to get data about a director from TMDB API
app.get("/api/director/:directorName", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190';
    const directorName = req.params.directorName; // Retrieve the director's name from the request parameters

    const apiUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${directorName}&page=1`;

    // Make the API call to search for the director by name
    const response = await axios.get(apiUrl);

    // Check if any director matches the provided name
    if (response.data.results && response.data.results.length > 0) {
      const director = response.data.results[0];
      res.json({
        id: director.id,
        name: director.name,
        biography: director.biography || "Biography not available",
        birthday: director.birthday || "Birthday not available",
        place_of_birth: director.place_of_birth || "Place of birth not available",
        profile_path: director.profile_path || null,
      });
    } else {
      res.status(404).json({ error: "Director not found" });
    }
  } catch (error) {
    console.error("Error fetching director data:", error.message);
    res.status(500).json({ error: "Failed to fetch director data from the API" });
  }
});


app.listen(3003, () =>{
  console.log("listening on port 3003")
})
