import express from "express";
import { getProducts } from "./product.controller.js";

let productRoutes = express.Router();

productRoutes.get("/products", getProducts);

export default productRoutes;
