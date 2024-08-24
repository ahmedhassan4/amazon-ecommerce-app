import express from "express";
import { addNote, getNote, updateNote, deleteNote } from "./note.controller.js";
import { verfiyToken } from "../../middelware/verifyToken.js";
let noteRoutes = express.Router();
noteRoutes.use("/note", verfiyToken);
noteRoutes.post("/note", addNote);
noteRoutes.get("/note", getNote);
noteRoutes.put("/note/:id", updateNote);
noteRoutes.delete("/note/:id", deleteNote);

//EXPORT AND GET IT FROM APP.JS
export default noteRoutes;
