import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    isComfirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    age: {
      type: Number,
      min: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

let userModel = mongoose.model("User", userSchema);

export { userModel };
