import express from "express";
import { dbConnection } from "./db/db.connection/db.connnection.js";
import userRoutes from "./src/modules/user/user.routes.js";
import noteRoutes from "./src/modules/note/note.routes.js";
import AppError from "./src/utili/appError.js";
import cros from "cors";
import productRoutes from "./src/modules/product/product.routes.js";
let app = express();
let port = 8888;
app.use(cros());
dbConnection;
app.use(express.json());
app.use(userRoutes);
app.use(noteRoutes);
app.use(productRoutes);

app.use("*", (req, res, next) => {
  next(new AppError("url not founded", 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
});
app.listen(port, () => {
  console.log("server is running now");
});
