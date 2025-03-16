import express from "express";
import castRouter from "./routes/cast.js";
import bingeRouter from "./routes/binge.js";
import mongoose from "mongoose";

// making database connection
await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// express app
const app = express();

// middlewares
app.use(express.json());

// Add root route handler here
app.get('/', (req, res) => {
  res.json({ 
    message: "Welcome to the Matrix",
    endpoints: {
      users: "/api/users",
      movies: "/api/movies"
    }
  });
});

// routes
app.use('/api/users', castRouter);
app.use('/api/movies', bingeRouter);

// server listening activities
const port = process.env.PORT || 1400;
app.listen(port, () => {
  console.log(`Welcome to the Multiverse, How you doin'port? ${port}`);
});
