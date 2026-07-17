import mongoose from "mongoose";

export const workPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subTitle: { type: String, required: true, trim: true },
    category: [
      {
        value: {
          type: String,
          required: [true, "Skill value identifier is required"],
          trim: true,
        },
        label: {
          type: String,
          required: [true, "Skill label display name is required"],
          trim: true,
        },
      },
    ],
    workImg: [{ imgSrc: { type: String, trim: true } }],
    expectedTime: { type: String, required: true, trim: true },
    finalDeliverable: { type: String, required: true, trim: true },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "PENDING", "ENDED"],
      default: "PENDING",
    },
    rate: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.models.WorkPost ||
  mongoose.model("WorkPost", workPostSchema);
