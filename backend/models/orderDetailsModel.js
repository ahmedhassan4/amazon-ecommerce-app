import mongoose from "mongoose";

const orderDetailsSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "shipped", "delivered", "cancelled"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "OrderItems",
    },
  ],
  payment: {
    type: mongoose.Schema.ObjectId,
    ref: "PaymentDetails",
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

const OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);
export default OrderDetails;
