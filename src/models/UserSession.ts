import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema({
  page: { type: String },
  timeSpent: { type: Number },
  scrollDepth: { type: Number },
  actions: [{ type: String }],
  timestamp: { type: Date }
});

const userSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: String },
  isLoggedIn: { type: Boolean },
  deviceInfo: { type: Object },
  interactions: [interactionSchema]
}, { timestamps: true });

export const UserSession = mongoose.model("UserSession", userSessionSchema);
