import fs from "fs";
import mongoose from "mongoose";
import User from "./models/cartItemModel.js";

import dotenv from "dotenv";
import CartItem from "./models/cartItemModel.js";
import Cart from "./models/cartModel.js";
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const users = JSON.parse(fs.readFileSync("./dev-data/cart.json", "utf-8"));

const importData = async () => {
  try {
    await Cart.create(users);
    console.log("data imported successfully");
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async () => {
  try {
    await Product.deleteMany();
    console.log("data deleted successfully");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteUser();
}
