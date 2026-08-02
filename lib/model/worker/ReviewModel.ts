import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  workerUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  Reviews: [
    {
      workPost: {
        type: mongoose.Schema.ObjectId,
        ref: "WorkPost",
        required: true,
      },
      bossId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      stars: { type: Number, default: 0, required: true },
      description: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
