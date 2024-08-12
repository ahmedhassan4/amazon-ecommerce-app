import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virual Properties
const poundToDollar = 50;
productSchema.virtual("priceInDolar").get(function () {
  return this.price / poundToDollar;
});

// Document middleware
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, "-", { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
