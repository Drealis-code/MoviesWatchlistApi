import { Router } from "express";
import { loginCast, registerCast } from "../controllers/cast.js";

const castRouter = Router();

// Defining user routes
castRouter.post("/register", registerCast);
castRouter.post("/login", loginCast);

export default castRouter;
