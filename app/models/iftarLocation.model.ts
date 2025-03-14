import mongoose from "mongoose";

const iftarLocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 20,
    },
    location: {
      type: String,
      required: true,
      maxLength: 20,
    },
    district: {
      type: String,
      required: true,
    },
    mapLink: {
      type: String,
      required: true,
      maxLength: 200,
    },
    foodItems: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const IftarLocation =
  mongoose.models.IftarLocation ||
  mongoose.model("IftarLocation", iftarLocationSchema);

export default IftarLocation;
