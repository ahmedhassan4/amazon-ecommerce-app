import { productModel } from "../../../db/model/product/product.model.js";

let getProducts = async (req, res) => {
  let products = await productModel.find();
  res.status(200).json({ products });
};

export { getProducts };
