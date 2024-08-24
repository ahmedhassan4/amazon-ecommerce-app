import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect("mongodb://127.0.0.1:27017/amazon")
  .then(() => {
    console.log("DBconnected");
  })
  .catch((err) => {
    console.log("DB error connection", err);
  });
