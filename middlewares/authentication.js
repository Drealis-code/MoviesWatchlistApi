import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;

// // === middlewares/checkAgeRestriction.js ===
// const User = require('../models/userModel');
// const Movie = require('../models/movieModel');

// const checkAgeRestriction = async (req, res, next) => {
//   try {
//     // Get the movie
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) return res.status(404).json({ message: 'Movie not found' });

//     // Get the user
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Calculate age
//     const today = new Date();
//     const birthDate = new Date(user.dateOfBirth);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();

//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }

//     // Check if user meets minimum age requirement
//     if (age < movie.minimumAge) {
//       return res.status(403).json({
//         message: `Age restriction: You must be at least ${movie.minimumAge} years old to watch this movie`
//       });
//     }

//     next();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = checkAgeRestriction;
