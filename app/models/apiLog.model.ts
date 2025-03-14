import mongoose from "mongoose";

const apiLogSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
    enum: ["GET", "POST", "PUT", "DELETE"],
  },
  accessedAt: {
    type: Date,
    default: Date.now,
  },
  district: String,
});

const ApiLog = mongoose.models.ApiLog || mongoose.model("ApiLog", apiLogSchema);
export default ApiLog;
