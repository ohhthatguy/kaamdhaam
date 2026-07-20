import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema({
  workerUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  workerHistory: [
    {
      postIntrested: {
        type: mongoose.Schema.ObjectId,
        ref: "WorkPost",
        required: true,
      },
      isWorkAssociated: { type: Boolean, default: false, required: true },
      dateOfShownIntrest: { type: Date, default: Date.now },
      dateOfWorkAssociation: { type: Date },
      dateOfWorkDenial: { type: Date },
    },
  ],

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

export default mongoose.models.Worker || mongoose.model("Worker", WorkerSchema);
