import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "failed"],
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

const PaymentDetails = mongoose.model("PaymentDetails", paymentDetailsSchema);
export default PaymentDetails;
