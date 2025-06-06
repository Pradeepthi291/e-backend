import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema({
  page: String,
  timeSpent: Number,
  scrollDepth: Number,
  actions: [String],
  timestamp: Date,
});

const userSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  userId: { type: String },
  isLoggedIn: { type: Boolean, required: true },
  deviceInfo: {
    platform: String,
    brand: String,
  },
  interactions: [interactionSchema],
  createdAt: { type: Date, default: Date.now },
});

export const UserSession = mongoose.model("UserSession", userSessionSchema);
