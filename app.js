const express = require("express")
const app = express()
const mongoose = require('mongoose');
require('dotenv').config();
const axios = require("axios");

app.use(express.json());



app.get("/", (req,res) => {
  res.send('Express app //node js, mongo ')
})

const mongoURI = 'mongodb+srv://Nathan:Nathan9936.@cluster0.r0le3gq.mongodb.net/myflix?retryWrites=true&w=majority';

const operationTimeout = 20000;

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

// Define a new route to get all movies from the TMDB API
app.get("/api/movies", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    // Make the API call to fetch movie data
    const response = await axios.get(apiUrl);
    const movies = response.data.results;

    // Fetch cast and director information for each movie
    const moviesWithDetails = await Promise.all(movies.map(async (movie) => {
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;
      const creditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`;

      const [detailsResponse, creditsResponse] = await Promise.all([
        axios.get(detailsUrl),
        axios.get(creditsUrl)
      ]);

      const cast = creditsResponse.data.cast.map(actor => actor.name);
      const directors = creditsResponse.data.crew
        .filter(crewMember => crewMember.job === "Director")
        .map(director => director.name);

      return {
        ...movie,
        cast,
        directors
      };
    }));

    res.json(moviesWithDetails);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// Define a new route to get one movie from the TMDB API
app.get("/api/movies/:movieTitle", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; 
    const movieTitle = req.params.movieTitle; // Retrieve the movie title from the request

    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1`;

    // Make the API call to search for the movie by its title
    const searchResponse = await axios.get(searchUrl);

    // Check if any movie matches the provided title
    if (searchResponse.data.results && searchResponse.data.results.length > 0) {
      const movieId = searchResponse.data.results[0].id;

      const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

      // Make the API call to get the full movie details including cast and crew
      const movieDetailsResponse = await axios.get(movieDetailsUrl);

      // Extract relevant information, including profile paths for cast and directors
      const movieData = {
        title: movieDetailsResponse.data.title,
        overview: movieDetailsResponse.data.overview,
        release_date: movieDetailsResponse.data.release_date,
        runtime: movieDetailsResponse.data.runtime,
        genres: movieDetailsResponse.data.genres.map(genre => genre.name),
        cast: movieDetailsResponse.data.credits.cast.map(actor => ({
          name: actor.name,
          character: actor.character,
          profile_path: actor.profile_path
        })),
        directors: movieDetailsResponse.data.credits.crew
          .filter(person => person.job === "Director")
          .map(director => ({
            name: director.name,
            profile_path: director.profile_path
          }))
      };

      // Return the complete movie details including cast and directors with profile paths
      res.json(movieData);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error.message);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});



// Define a Mongoose schema for genres
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

// Create a Mongoose model for genres
const Genre = mongoose.model('Genre', genreSchema);

// Route to get the description of a genre from the database
app.get("/api/genre/:genreName", async (req, res) => {
  try {
    const genreName = req.params.genreName.toLowerCase();

    // Find the genre in the database by name, ignoring case
    const genre = await Genre.findOne({ name: new RegExp(genreName, 'i') });

    if (genre) {
      return res.status(200).json({
        name: genre?.name,
        description: genre?.description,
      });
    } else {
      return res.status(404).json({ error: "Genre not found" });
    }
  } catch (error) {
    console.error("Error fetching genre description:", error.message);
    return res.status(500).json({ error: "Failed to fetch genre description" });
  }
});



// route to get movies or TV shows by genre from the TMDB API
app.get("/api/discover/:mediaType/:genreName", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; 
    const mediaType = req.params.mediaType; // Retrieve the media type from the request (movie or tv)
    const genreName = req.params.genreName.toLowerCase(); // Retrieve the genre name from the request

    // Get all genres and their IDs from the TMDB API
    const genresUrl = `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apiKey}&language=en-US`;
    const genresResponse = await axios.get(genresUrl);

    // Check if any genre matches the provided name
    if (genresResponse.data.genres && genresResponse.data.genres.length > 0) {
      const genre = genresResponse.data.genres.find(g => g.name.toLowerCase() === genreName);
      if (genre) {
        // Get the movies or TV shows that match the genre ID from the TMDB API
        const discoverUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&with_genres=${genre.id}`;
        const discoverResponse = await axios.get(discoverUrl);

        // Check if any movie or TV show matches the genre ID
        if (discoverResponse.data.results && discoverResponse.data.results.length > 0) {
          res.json(discoverResponse.data.results);
        } else {
          res.status(404).json({ error: "No movies or TV shows found for this genre" });
        }
      } else {
        res.status(404).json({ error: "Genre not found" });
      }
    } else {
      res.status(404).json({ error: "No genres available" });
    }
  } catch (error) {
    console.error("Error fetching movies or TV shows by genre:", error.message);
    res.status(500).json({ error: "Failed to fetch movies or TV shows by genre" });
  }
});

// Define a new route to get data about a director from TMDB API
app.get("/api/director/:directorName", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190';
    const directorName = req.params.directorName; // Retrieve the director's name from the request parameters

    const personSearchUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${directorName}&page=1`;

    // Make the API call to search for the director by name
    const personResponse = await axios.get(personSearchUrl);

    // Check if any director matches the provided name
    if (personResponse.data.results && personResponse.data.results.length > 0) {
      const director = personResponse.data.results[0];

      const filmographyUrl = `https://api.themoviedb.org/3/person/${director.id}/combined_credits?api_key=${apiKey}&language=en-US`;

      // Make the API call to get the director's filmography
      const filmographyResponse = await axios.get(filmographyUrl);

      const directedMovies = filmographyResponse.data.crew.filter(
        (entry) =>
          entry.job === "Director" && (entry.media_type === "movie" || entry.media_type === "tv")
      );

      res.json({
        id: director.id,
        name: director.name,
        biography: director.biography || "Biography not available",
        birthday: director.birthday || "Birthday not available",
        place_of_birth: director.place_of_birth || "Place of birth not available",
        profile_path: director.profile_path || null,
        directed: directedMovies.map((entry) => ({
          id: entry.id,
          title: entry.title || entry.name,
          media_type: entry.media_type,
          poster_path: entry.poster_path || null,
        })),
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
