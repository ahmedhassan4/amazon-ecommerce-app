import mongoose from "mongoose";

let noteSchema = new mongoose.Schema(
  {
    title: String,
    desciption: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

let noteModel = mongoose.model("Note", noteSchema);

export { noteModel };
