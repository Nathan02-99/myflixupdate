const express = require("express")
const app = express()
const mongoose = require('mongoose');
require('dotenv').config();
const axios = require("axios");
const cors = require('cors');

app.use(express.json());
app.use(cors());

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



//  get all movies and all Tv shows
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

// popular movies
app.get("/api/popular-movies", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; // Replace this with your API key
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    const response = await axios.get(apiUrl);
    const movies = response.data.results;

    // Update each movie object to include title, backdrop, and poster URLs
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // Base URL for images

    const moviesWithCompleteImageUrls = [];

    for (const movie of movies) {
      const movieId = movie.id;
      const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

      const movieDetailsResponse = await axios.get(movieDetailsUrl);

      // Extract cast and director information
      const cast = movieDetailsResponse.data.credits.cast.map(actor => ({
        name: actor.name,
        character: actor.character,
        profile_path: `${baseImageUrl}${actor.profile_path}`, // Construct complete profile image URL
      }));

      const directors = movieDetailsResponse.data.credits.crew
        .filter(person => person.job === "Director")
        .map(director => ({
          name: director.name,
          profile_path: `${baseImageUrl}${director.profile_path}`, // Construct complete profile image URL
        }));

      moviesWithCompleteImageUrls.push({
        id: movie.id,
        title: movie.title,
        backdrop_path: `${baseImageUrl}${movie.backdrop_path}`,
        poster_path: `${baseImageUrl}${movie.poster_path}`,
        overview: movie.overview,
        release_date: movie.release_date || movie.first_air_date,
        runtime: movie.runtime || movie.episode_run_time?.[0],
        genres: movie.genre_ids,
        cast,
        directors,
      });
    }

    res.json(moviesWithCompleteImageUrls);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

// popular series
app.get("/api/popular-series", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; // Replace with your API key
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

    const response = await axios.get(apiUrl);
    const series = response.data.results;

    // Create an array to store popular series with complete data
    const popularSeriesWithCompleteData = [];

    // Define baseImageUrl here
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // Base URL for images

    for (const serie of series) {
      const serieId = serie.id;
      const serieDetailsUrl = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

      const serieDetailsResponse = await axios.get(serieDetailsUrl);

      // Extract cast and director information
      const cast = serieDetailsResponse.data.credits.cast.map(actor => ({
        name: actor.name,
        character: actor.character,
        profile_path: `${baseImageUrl}${actor.profile_path}`, // Construct complete profile image URL
      }));

      const directors = serieDetailsResponse.data.credits.crew
        .filter(person => person.job === "Director")
        .map(director => ({
          name: director.name,
          profile_path: `${baseImageUrl}${director.profile_path}`, // Construct complete profile image URL
        }));

      // Update the backdrop and poster paths to complete image URLs and include the name/title
      popularSeriesWithCompleteData.push({
        id: serie.id,
        name: serie.name,
        backdrop_path: `${baseImageUrl}${serie.backdrop_path}`, // Construct complete backdrop image URL
        poster_path: `${baseImageUrl}${serie.poster_path}`, // Construct complete poster image URL
        cast,
        directors,
      });
    }

    res.json(popularSeriesWithCompleteData);
  } catch (error) {
    console.error("Error fetching popular series:", error.message);
    res.status(500).json({ error: "Failed to fetch popular series" });
  }
});

// Top-rated movies
app.get("/api/top-rated-movies", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; // Replace with your API key
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${req.query.page}`;

    const response = await axios.get(apiUrl);
    const movies = response.data.results;

    // Create an array to store top-rated movies with complete data
    const topRatedMoviesWithCompleteData = [];

    // Define baseImageUrl here
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // Base URL for images

    for (const movie of movies) {
      const movieId = movie.id;
      const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

      const movieDetailsResponse = await axios.get(movieDetailsUrl);

      // Extract cast and director information
      const cast = movieDetailsResponse.data.credits.cast.map(actor => ({
        name: actor.name,
        character: actor.character,
        profile_path: `${baseImageUrl}${actor.profile_path}`, // Construct complete profile image URL
      }));

      const directors = movieDetailsResponse.data.credits.crew
        .filter(person => person.job === "Director")
        .map(director => ({
          name: director.name,
          profile_path: `${baseImageUrl}${director.profile_path}`, // Construct complete profile image URL
        }));

      // Update the backdrop and poster paths to complete image URLs and include the title
      topRatedMoviesWithCompleteData.push({
        id: movie.id,
        title: movie.title,
        backdrop_path: `${baseImageUrl}${movie.backdrop_path}`, // Construct complete backdrop image URL
        poster_path: `${baseImageUrl}${movie.poster_path}`, // Construct complete poster image URL
        cast,
        directors,
      });
    }

    res.json(topRatedMoviesWithCompleteData);
  } catch (error) {
    console.error("Error fetching top-rated movies:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated movies" });
  }
});

// Top-rated TV shows
app.get("/api/top-rated-series", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; // Replace with your API key
    const apiUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=${req.query.page}`;

    const response = await axios.get(apiUrl);
    const series = response.data.results;

    // Create an array to store top-rated series with complete data
    const topRatedSeriesWithCompleteData = [];

    // Define baseImageUrl here
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // Base URL for images

    for (const serie of series) {
      const serieId = serie.id;
      const serieDetailsUrl = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

      const serieDetailsResponse = await axios.get(serieDetailsUrl);

      // Extract cast and director information
      const cast = serieDetailsResponse.data.credits.cast.map(actor => ({
        name: actor.name,
        character: actor.character,
        profile_path: `${baseImageUrl}${actor.profile_path}`, // Construct complete profile image URL
      }));

      const directors = serieDetailsResponse.data.credits.crew
        .filter(person => person.job === "Director")
        .map(director => ({
          name: director.name,
          profile_path: `${baseImageUrl}${director.profile_path}`, 
        }));

      // Update the backdrop and poster paths to complete image URLs and include the name/title
      topRatedSeriesWithCompleteData.push({
        id: serie.id,
        name: serie.name,
        backdrop_path: `${baseImageUrl}${serie.backdrop_path}`, // Construct complete backdrop image URL
        poster_path: `${baseImageUrl}${serie.poster_path}`, // Construct complete poster image URL
        cast,
        directors,
      });
    }

    res.json(topRatedSeriesWithCompleteData);
  } catch (error) {
    console.error("Error fetching top-rated series:", error.message);
    res.status(500).json({ error: "Failed to fetch top-rated series" });
  }
});

// movies only
app.get("/api/all-movies", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; // Replace this with your API key
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${req.query.page}`;

    const response = await axios.get(apiUrl);
    const movies = response.data.results;

    // Create an array to store movies with complete data
    const moviesWithCompleteData = [];
    
    // Define baseImageUrl here
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // Base URL for images

    for (const movie of movies) {
      const movieId = movie.id;
      const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

      const movieDetailsResponse = await axios.get(movieDetailsUrl);

      // Extract cast and director information
      const cast = movieDetailsResponse.data.credits.cast.map(actor => ({
        name: actor.name,
        character: actor.character,
        profile_path: `${baseImageUrl}${actor.profile_path}`, // Construct complete profile image URL
      }));

      const directors = movieDetailsResponse.data.credits.crew
        .filter(person => person.job === "Director")
        .map(director => ({
          name: director.name,
          profile_path: `${baseImageUrl}${director.profile_path}`, // Construct complete profile image URL
        }));

      // Update the backdrop and poster paths to complete image URLs and include the title

      moviesWithCompleteData.push({
        id: movie.id,
        title: movie.title,
        backdrop_path: `${baseImageUrl}${movie.backdrop_path}`, // Construct complete backdrop image URL
        poster_path: `${baseImageUrl}${movie.poster_path}`, // Construct complete poster image URL
        cast,
        directors,
      });
    }

    res.json(moviesWithCompleteData);
  } catch (error) {
    console.error("Error fetching all movies:", error.message);
    res.status(500).json({ error: "Failed to fetch all movies" });
  }
});

// TV shows only
app.get("/api/all-series", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; // Replace this with your API key
    const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=${req.query.page}`;

    const response = await axios.get(apiUrl);
    const series = response.data.results;

    // Create an array to store series with complete data
    const seriesWithCompleteData = [];

    // Define baseImageUrl here
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // Base URL for images

    for (const serie of series) {
      const serieId = serie.id;
      const serieDetailsUrl = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

      const serieDetailsResponse = await axios.get(serieDetailsUrl);

      // Extract cast and director information
      const cast = serieDetailsResponse.data.credits.cast.map(actor => ({
        name: actor.name,
        character: actor.character,
        profile_path: `${baseImageUrl}${actor.profile_path}`, // Construct complete profile image URL
      }));

      const directors = serieDetailsResponse.data.credits.crew
        .filter(person => person.job === "Director")
        .map(director => ({
          name: director.name,
          profile_path: `${baseImageUrl}${director.profile_path}`, // Construct complete profile image URL
        }));

      // Update the backdrop and poster paths to complete image URLs and include the name/title
      seriesWithCompleteData.push({
        id: serie.id,
        name: serie.name,
        backdrop_path: `${baseImageUrl}${serie.backdrop_path}`, // Construct complete backdrop image URL
        poster_path: `${baseImageUrl}${serie.poster_path}`, // Construct complete poster image URL
        cast,
        directors,
      });
    }

    res.json(seriesWithCompleteData);
  } catch (error) {
    console.error("Error fetching all series:", error.message);
    res.status(500).json({ error: "Failed to fetch all series" });
  }
});

// One movie search
app.get("/api/movies/:movieTitle", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; 
    const movieTitle = req.params.movieTitle; // Retrieve the movie title from the request

    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1`;

    // Make the API call to search for movies and TV shows by their title
    const searchResponse = await axios.get(searchUrl);

    // Check if any results match the provided title
    if (searchResponse.data.results && searchResponse.data.results.length > 0) {
      const moviesData = [];

      // Loop through the results and collect relevant information for each item
      for (const result of searchResponse.data.results) {
        if (result.title || result.name) {
          const mediaType = result.media_type || "movie"; // Default to movie if media_type is not provided

          const movieData = {
            id: result.id,
            title: result.title || result.name,
            overview: result.overview,
            release_date: result.release_date || result.first_air_date,
            runtime: mediaType === "movie" ? result.runtime : result.episode_run_time?.[0],
            genres: result.genre_ids, // You can fetch genre names separately if needed
            // Add other relevant fields here
          };

          // Fetch additional details including cast, directors, and poster path
          const movieId = result.id;
          const movieDetailsUrl = `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

          const movieDetailsResponse = await axios.get(movieDetailsUrl);

          // Add missing data to the movieData object
          movieData.cast = movieDetailsResponse.data.credits.cast.map(actor => ({
            name: actor.name,
            character: actor.character,
            profile_path: actor.profile_path
          }));

          movieData.directors = movieDetailsResponse.data.credits.crew
            .filter(person => person.job === "Director")
            .map(director => ({
              name: director.name,
              profile_path: director.profile_path
            }));

          movieData.poster_path = `https://image.tmdb.org/t/p/w500${movieDetailsResponse.data.poster_path}`;

          moviesData.push(movieData);
        }
      }

      res.json(moviesData);
    } else {
      res.status(404).json({ error: "Movies/TV shows not found" });
    }
  } catch (error) {
    console.error("Error fetching movies/TV shows:", error.message);
    res.status(500).json({ error: "Failed to fetch movies/TV shows" });
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

// route to get data about a director from TMDB API by their ID
app.get("/api/director/:directorId", async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190';
    const directorId = req.params.directorId; // Retrieve the director's ID from the request parameters

    const personDetailsUrl = `https://api.themoviedb.org/3/person/${directorId}?api_key=${apiKey}&language=en-US`;

    // Make the API call to get details about the director by ID
    const personResponse = await axios.get(personDetailsUrl);

    // Check if the director was found
    if (personResponse.data) {
      const director = personResponse.data;

      const filmographyUrl = `https://api.themoviedb.org/3/person/${directorId}/combined_credits?api_key=${apiKey}&language=en-US`;

      // Make the API call to get the director's filmography
      const filmographyResponse = await axios.get(filmographyUrl);

      const directedMovies = filmographyResponse.data.crew.filter(
        (entry) =>
          entry.job === "Director" && (entry.media_type === "movie" || entry.media_type === "tv")
      );

      // Function to construct image URLs
      const constructImageUrl = (path) => {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
      };

      res.json({
        id: director.id,
        name: director.name,
        biography: director.biography || "Biography not available",
        birthday: director.birthday || "Birthday not available",
        place_of_birth: director.place_of_birth || "Place of birth not available",
        profile_path: constructImageUrl(director.profile_path),
        directed: directedMovies.map((entry) => ({
          id: entry.id,
          title: entry.title || entry.name,
          media_type: entry.media_type,
          poster_path: constructImageUrl(entry.poster_path),
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

// endpoint to fetch movie details by ID
app.get('/api/movies/:id/details', async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; // Replace with your API key
    const movieId = req.params.id;

    // Construct the URL to fetch movie details using the movie ID
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;

    // Fetch movie details and credits (cast and crew) from the external API in parallel
    const [movieDetailsResponse, creditsResponse] = await Promise.all([
      axios.get(movieDetailsUrl),
      axios.get(creditsUrl),
    ]);

    const movieDetails = movieDetailsResponse.data;
    const credits = creditsResponse.data;

    // Transform and customize the movie data as needed
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // Base URL for images
    const completeMovieData = {
      id: movieDetails.id,
      title: movieDetails.title,
      backdrop_path: `${baseImageUrl}${movieDetails.backdrop_path}`,
      poster_path: `${baseImageUrl}${movieDetails.poster_path}`,
      overview: movieDetails.overview,
      release_date: movieDetails.release_date,
      runtime: movieDetails.runtime,
      genres: movieDetails.genres.map((genre) => genre.name),
      // You can add more fields as needed
    };

    // Extract cast information
    const cast = credits.cast.map((actor) => ({
      name: actor.name,
      character: actor.character,
      profile_path: actor.profile_path
        ? `${baseImageUrl}${actor.profile_path}`
        : null, // Construct complete profile image URL
    }));

    // Extract director information
    const directors = credits.crew
      .filter((person) => person.job === 'Director')
      .map((director) => ({
        id:director.id,
        name: director.name,
        profile_path: director.profile_path
          ? `${baseImageUrl}${director.profile_path}`
          : null, // Construct complete profile image URL
      }));

    // Add cast and director information to the complete movie data
    completeMovieData.cast = cast;
    completeMovieData.directors = directors;

    // Send the customized movie data as a response
    res.json(completeMovieData);
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// endpoint to fetch TV series details by ID
app.get('/api/series/:id/details', async (req, res) => {
  try {
    const apiKey = '372f45cfd5f7b20e54501ddf25b06190'; // Replace with your API key
    const serieId = req.params.id;

    // Construct the URL to fetch TV series details using the TV series ID
    const serieDetailsUrl = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=en-US`;
    const creditsUrl = `https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${apiKey}&language=en-US`;

    // Fetch TV series details and credits (cast and crew) from the external API in parallel
    const [serieDetailsResponse, creditsResponse] = await Promise.all([
      axios.get(serieDetailsUrl),
      axios.get(creditsUrl),
    ]);

    const serieDetails = serieDetailsResponse.data;
    const credits = creditsResponse.data;

    // Transform and customize the TV series data as needed
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // Base URL for images
    const completeSerieData = {
      id: serieDetails.id,
      name: serieDetails.name,
      backdrop_path: `${baseImageUrl}${serieDetails.backdrop_path}`,
      poster_path: `${baseImageUrl}${serieDetails.poster_path}`,
      overview: serieDetails.overview,
      first_air_date: serieDetails.first_air_date,
      episode_runtime: serieDetails.episode_runtime,
      genres: serieDetails.genres.map((genre) => genre.name),
      // You can add more fields as needed
    };

    // Extract cast information
    const cast = credits.cast.map((actor) => ({
      name: actor.name,
      character: actor.character,
      profile_path: actor.profile_path
        ? `${baseImageUrl}${actor.profile_path}`
        : null, // Construct complete profile image URL
    }));

    // Extract director information (if available for TV series)
    const directors = credits.crew
      .filter((person) => person.job === 'Director' || person.job === 'Creator')
      .map((director) => ({
        id:director.id,
        name: director.name,
        profile_path: director.profile_path
          ? `${baseImageUrl}${director.profile_path}`
          : null, // Construct complete profile image URL
      }));

    // Add cast and director information to the complete TV series data
    completeSerieData.cast = cast;
    completeSerieData.directors = directors;

    // Send the customized TV series data as a response
    res.json(completeSerieData);
  } catch (error) {
    console.error('Error fetching TV series details:', error.message);
    res.status(500).json({ error: 'Failed to fetch TV series details' });
  }
});

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.listen(3003, () =>{
  console.log("listening on port 3003")
})
