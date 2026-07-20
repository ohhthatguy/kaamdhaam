import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.ObjectId,
    ref: "WorkPost",
    required: true,
  },
  intrestedWorkers: [
    {
      workerName: { type: String, required: true },
      workerImg: { type: String, required: true },
      workerBio: { type: String, required: true },
      workerId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
      isWorkAssociated: { type: Boolean, required: true, default: false },
      offerMadeAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.models.Offer || mongoose.model("Offer", OfferSchema);
