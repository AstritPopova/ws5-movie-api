const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB URI Atlasista tai lokaalista
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ws5_movies";

app.use(cors());
app.use(express.json());

// Mongo-yhteys
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Mongoose-skeema ja -malli
const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: Number,
    director: String,
    rating: Number,
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

// REST-reitit

// GET /api/movies - kaikki leffat
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find({}).limit(50);
    res.status(200).json(movies);
  } catch (err) {
    console.error("GET /api/movies error:", err);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// GET /api/movies/:id - yksi leffa id:llä
app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (err) {
    console.error("GET /api/movies/:id error:", err.message);
    res.status(400).json({ error: "Invalid id" });
  }
});

// POST /api/movies - uusi leffa
app.post("/api/movies", async (req, res) => {
  try {
    console.log("POST /api/movies body:", req.body); // debug
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    console.error("POST /api/movies error:", err.message);
    res.status(400).json({ error: "Invalid movie data", details: err.message });
  }
});

// PUT /api/movies/:id - päivitys
app.put("/api/movies/:id", async (req, res) => {
  try {
    console.log("PUT /api/movies body:", req.body); // debug
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (err) {
    console.error("PUT /api/movies/:id error:", err.message);
    res.status(400).json({ error: "Invalid update data", details: err.message });
  }
});

// DELETE /api/movies/:id - poisto
app.delete("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json({ message: "Deleted", id: movie._id });
  } catch (err) {
    console.error("DELETE /api/movies/:id error:", err.message);
    res.status(400).json({ error: "Invalid id" });
  }
});

// Testireitti
app.get("/", (req, res) => {
  res.json({ message: "WS-5 Movie API running" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
