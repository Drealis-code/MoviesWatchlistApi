import { MovieModel } from "../models/binge.js";
import authMiddleware from "../middlewares/authentication.js";
import { movieValidation } from "../validators/binge.js";


export const addBinge = async (req, res, next) => {
  try {
    console.log(req.body);
    const { error, value } = movieValidation.validate({
      ...req.body,
      coverImage: req.file?.filename,
    });
    if (error) {
      return res.status(422).json(error);
    }
    const result = await MovieModel.create(value);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getBinge = async (req, res, next) => {
  try {
    const movies = await MovieModel.find({ userId: req.user.id });
    const authMiddleware= (req, res, next) => {
      req.user = { id: "placeholderId" };
      next();
    };
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBingeById = async (req, res) => {
  try {
    const movie = await MovieModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBinge = async (req, res, next) => {
  // Validate request
  const { error } = movieValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const movie = await MovieModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Update movie properties
    if (req.body.title) movie.title = req.body.title;
    if (req.body.director) movie.director = req.body.director;
    if (req.body.year) movie.year = req.body.year;
    if (req.body.genre) movie.genre = req.body.genre;
    if (req.body.ageRating) movie.ageRating = req.body.ageRating;
    if (req.body.watched !== undefined)
      movie.watched = req.body.watched === "true";

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBinge = async (req, res, next) => {
  try {
    const movie = await MovieModel.findByIdAndDelete({
      id: req.params.id,
      userId: req.user.id,
    });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Delete cover image if exists
    //  if (movie.coverImage) {
    //     fs.unlink(movie.coverImage, (err) => {
    //       if (err) console.error('Error deleting image:', err);
    //     });
    //   }

    res.json({ message: "Movie removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const watchedBinge = async (req, res, next) => {
  try {
    const movie = await MovieModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    movie.watched = !movie.watched;
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
