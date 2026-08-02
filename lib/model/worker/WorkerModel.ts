import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema({
  workerUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  totalApplication: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
  ],
});

export default mongoose.models.Worker || mongoose.model("Worker", WorkerSchema);
