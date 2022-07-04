import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    important: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notes", NotesSchema);
