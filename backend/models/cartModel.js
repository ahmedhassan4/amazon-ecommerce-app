import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0,
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
  coupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupons",
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

// MiddleWare
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "name email",
  }).populate({
    path: "items.productId",
    select: "name price",
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
