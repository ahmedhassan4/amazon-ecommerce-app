import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

// all bugs the happens in synchronouse code

process.on("uncaughtException", (err) => {
  console.log("shutting Down!!!");
  console.log(err.name, err.message);
  process.exit(1);
});

import app from "./app.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connection successfull!");
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// promises that is not handeled any ware like database in Asysnchronuse
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("shutting Down!!!");
  server.close(() => {
    process.exit(1);
  });
});
