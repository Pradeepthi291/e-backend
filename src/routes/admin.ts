import { Request, Response } from 'express';
import express from "express";
import { UserSession } from "../models/UserSession";
import { getStartDateFromRange } from "../utils";


const router = express.Router();

router.get("/analytics", async (req:Request, res:Response) => {
  try {
    const range = (req.query.range as string) || "all";
    const startDate = getStartDateFromRange(range);

    // Build match filter if startDate exists
    const matchStage = startDate ? { createdAt: { $gte: startDate } } : {};

    // 1. Total unique sessions filtered by date
    const totalSessions = await UserSession.countDocuments(matchStage);

    // 2. Top 10 visited pages filtered by date
    const topPages = await UserSession.aggregate([
      { $match: matchStage },
      { $unwind: "$interactions" },
      { $group: { _id: "$interactions.page", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // 3. Average time spent per page filtered by date
    const avgTimeSpent = await UserSession.aggregate([
      { $match: matchStage },
      { $unwind: "$interactions" },
      { $group: { _id: "$interactions.page", avgTime: { $avg: "$interactions.timeSpent" } } },
      { $sort: { avgTime: -1 } },
      { $limit: 10 },
    ]);

    // 4. Top clicked buttons filtered by date
    const topActions = await UserSession.aggregate([
      { $match: matchStage },
      { $unwind: "$interactions" },
      { $unwind: "$interactions.actions" },
      { $group: { _id: "$interactions.actions", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // 5. LoggedIn vs LoggedOut filtered by date
    const loggedStats = await UserSession.aggregate([
      { $match: matchStage },
      { $group: { _id: "$isLoggedIn", count: { $sum: 1 } } },
    ]);

    // 6. Top devices filtered by date
    const topDevices = await UserSession.aggregate([
      { $match: matchStage },
      { $group: { _id: "$deviceInfo.platform", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
// Add this below topDevices aggregation
const topDeviceCategories = await UserSession.aggregate([
  { $match: matchStage },
  { $group: { _id: "$deviceInfo.brand", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 },
]);

   res.status(200).json({
  totalSessions,
  topPages,
  avgTimeSpent,
  topActions,
  loggedStats,
  topDevices,
  topDeviceCategories,  // <- Add here so frontend gets this data
});

  } catch (err) {
    console.error("Admin analytics error:", err);
    res.status(500).json({ error: "Analytics failed" });
  }
});

export default router;
