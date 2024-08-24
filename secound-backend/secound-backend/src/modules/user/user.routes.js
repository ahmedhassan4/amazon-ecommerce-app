import express from "express";
import { signUp, signIn, verifyEmail } from "./user.controller.js";

let userRoutes = express.Router();

userRoutes.get("/verify/:token", verifyEmail);
userRoutes.post("/signup", signUp);
userRoutes.post("/signin", signIn);

export default userRoutes;
