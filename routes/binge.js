import { Router } from "express";
import authMiddleware from "../middlewares/authentication.js";
import {
  addBinge,
  deleteBinge,
  getBinge,
  getBingeById,
  updateBinge,
  watchedBinge,
} from "../controllers/binge.js";
import { remoteUpload } from "../middlewares/upload.js";

// routers
const bingeRouter = Router();

// defining routes(movies)
bingeRouter.post("/", remoteUpload.single("coverImage"), addBinge);
bingeRouter.get("/", authMiddleware, getBinge);
bingeRouter.get("/:id", getBingeById);
bingeRouter.patch("/:id", updateBinge);
bingeRouter.delete("/:id", deleteBinge);
bingeRouter.get("/count", watchedBinge);

export default bingeRouter;
