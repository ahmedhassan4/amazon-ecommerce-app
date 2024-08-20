import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "OrderDetails",
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
});

const OrderItems = mongoose.model("OrderItems", orderItemsSchema);
export default OrderItems;
