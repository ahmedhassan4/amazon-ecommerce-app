import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
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
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
