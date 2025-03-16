import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

// user schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Apply normalize plugin
userSchema.plugin(normalize);

// Movie Schema
const movieSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    director: { type: String },
    year: { type: Number },
    genre: {
      type: String,
      enum: [
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
        "Western",
      ],
    },
    ageRating: {
      type: String,
      enum: ["G", "PG", "PG-13", "R", "NC-17"],
      required: true,
    },
    minimumAge: {
      type: Number,
      default: function () {
        switch (this.ageRating) {
          case "G":
            return 0;
          case "PG":
            return 7;
          case "PG-13":
            return 13;
          case "R":
            return 17;
          case "NC-17":
            return 18;
          default:
            return 0;
        }
      },
    },
    coverImage: { type: String },
    watched: { type: Boolean, default: false },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Apply normalize plugin
movieSchema.plugin(normalize);

export const UserModel = model("User", userSchema);
export const MovieModel = model("Movie", movieSchema);
