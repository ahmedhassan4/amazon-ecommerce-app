import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    description: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    slug: String,
    price: {
      type: Number,
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
      // required: true,
    },
    discounts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Discount",
      },
    ],
    coupons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupons",
      },
    ],
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
    },
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
    deletedAt: {
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

// // Virtual Property for Price with Discount
// productSchema.virtual('priceAfterDiscount').get(function () {
//   // Calculate the discounted price
//   if (this.discounts.length > 0) {
//     // Assuming the first discount is applied for simplicity
//     const discount = this.discounts[0];
//     return this.price * (1 - discount.discount_percent / 100);
//   }
//   return this.price;
// });

const poundToDollar = 50;
productSchema.virtual("priceInDolar").get(function () {
  return this.price / poundToDollar;
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, "-", { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
