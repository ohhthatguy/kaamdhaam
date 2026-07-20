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
    expectedTime: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "within 1-3 hour",
        "within half a day",
        "about a day",
        "within 1-3 days",
        "within a week",
      ],
      default: "within 1-3 hour",
    },
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
    rateType: {
      type: String,
      enum: ["per Hour", "per Task", "per Day"],
      default: "per Hour",
    },

    locationCord: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: undefined,
      },
    },
  },
  { timestamps: true },
);

workPostSchema.index({ locationCord: "2dsphere" });
export default mongoose.models.WorkPost ||
  mongoose.model("WorkPost", workPostSchema);
