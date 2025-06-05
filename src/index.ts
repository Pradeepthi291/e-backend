/// <reference path="./types/express-session.d.ts" />
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import useragent from "express-useragent";
import session from "express-session";
import mongoose from "mongoose";

import { connectDB } from "./config/db"; // Your DB connection file
import trackRoutes from "./routes/track";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(useragent.express());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Routes
app.use("/api", trackRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

// Test routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is working 🚀");
});
app.get("/api/test", (req: Request, res: Response) => {
  res.send("Backend is working 🎉");
});

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
