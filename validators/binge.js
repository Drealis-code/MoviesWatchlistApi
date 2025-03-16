import Joi from "joi";

// userRegisteration Validation Schema
export const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dateOfBirth: Joi.date().max("now").required(),
});

// userLogin Validation Schema
export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

//   movie validation schema
export const movieValidation = Joi.object({
  title: Joi.string().required(),
  director: Joi.string(),
  coverImage: Joi.string(),
  year: Joi.number().integer().min(1888).max(new Date().getFullYear()),
  genre: Joi.string().valid(
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western"
  ),
  ageRating: Joi.string().valid("G", "PG", "PG-13", "R", "NC-17").required(),
  watched: Joi.boolean(),
});
