import mongoose from "mongoose";

let productSchema = mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
      rate: Number,
      count: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

let productModel = mongoose.model("Product", productSchema);

export { productModel };
