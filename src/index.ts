/// <reference path="./types/express-session.d.ts" />
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import useragent from "express-useragent";
import { connectDB } from "./config/db"; // Your DB connection file
import trackRoutes from "./routes/track";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";
import session from "express-session";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware setup
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(useragent.express());
app.use(
  session({
    secret: "secretkey123", // Change this in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // true only if HTTPS
  })
);

// Routes
app.use("/api", trackRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

// Test route
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
