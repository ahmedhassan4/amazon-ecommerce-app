import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  total: {
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
  coupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupons",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem",
    },
  ],
});

// MiddleWare
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  }).populate({
    path: "items",
    populate: {
      path: "product",
    },
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Can be Modefied to embeded and remove cart items
//////////////////////////////////////////////////////////////////
// const cartSchema = new mongoose.Schema({
//   total: {
//     type: Number,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     select: false,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//     select: false,
//   },
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//   },
//   items: [
//     {
//       product: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
// });
