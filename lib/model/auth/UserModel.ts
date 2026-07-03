import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
      maxlength: [50, "Name cannot be more than 50 characters"],
      trim: true,
    },

    age: {
      type: String,
      required: [true, "Please Provide an Age"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please provide an email."],
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Please Provide a valid phone number"],
      trim: true,
    },

    profileImg: {
      type: String,
      required: [true, "Please Provide a valid Image"],
      trim: true,
    },

    skills: [
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
        rate: {
          type: String,
          required: [true, "Please provide a rate for this skill"],
        },
        rateType: {
          type: String,
          enum: ["per Hour", "per Day", "Flat Rate"],
          required: [true, "Please select a rate type"],
        },
      },
    ],

    bio: {
      type: String,
      required: [true, "Please provide a bio."],
      maxlength: [150, "Bio cannot be more than 150 characters"],
      trim: true,
    },

    role: {
      type: String,
      enum: ["CONSUMER", "PRODUCER", "ADMIN"],
      default: "CONSUMER",
    },

    password: {
      type: String,
      required: [true, "Please Provide a valid password"],
    },

    isVerified: {
      type: Boolean,
      default: false,
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
  {
    timestamps: true,
  },
);
UserSchema.index({ locationCord: "2dsphere" });
export default mongoose.models.User || mongoose.model("User", UserSchema);
