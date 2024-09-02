import express from "express";
import {
  addToCart,
  createCart,
  deletecart,
  getAllCarts,
  getCart,
  updateCart,
} from "../controllers/cartController.js";

import { protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/addToCart", protect, addToCart);

router.route("/").get(getAllCarts).post(createCart);
router.route("/:id").get(getCart).delete(deletecart).patch(updateCart);

export default router;
