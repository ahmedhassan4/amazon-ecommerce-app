import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discount_percent: {
    type: Number,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  active: {
    type: Boolean,
    default: false,
    select: false,
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
});

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
