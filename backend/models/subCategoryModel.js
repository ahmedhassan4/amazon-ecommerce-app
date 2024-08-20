import mongoose from "mongoose";

const subCtaegorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
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

const SubCtaegory = mongoose.model("SubCtaegory", subCtaegorySchema);
export default SubCtaegory;
