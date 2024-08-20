import mongoose from "mongoose";

const userPaymentSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  account_no: {
    type: number,
    required: true,
  },
  payment_type: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

const UserPayment = mongoose.model("UserPayment", userPaymentSchema);
export default UserPayment;
