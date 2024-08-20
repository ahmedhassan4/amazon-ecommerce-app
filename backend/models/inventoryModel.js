import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true,
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

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
