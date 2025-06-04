import express from "express";
import { trackUser } from "../middleware/trackUser";
import { UserSession } from "../models/UserSession";

const router = express.Router();

// POST /api/track
router.post("/track", trackUser, async (req, res) => {
  try {
    const { sessionId, userId, isLoggedIn, interactions } = req.body;

    if (!sessionId || !interactions) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Find or create session and update
    const session = await UserSession.findOneAndUpdate(
      { sessionId },
      {
        $set: {
          userId,
          isLoggedIn,
          deviceInfo: req.body.deviceInfo,
        },
        $push: {
          interactions: interactions[0], // push one interaction at a time
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error("Tracking Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
