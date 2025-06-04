import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI not found in environment variables");
  }

  await mongoose.connect(mongoURI);
  console.log("MongoDB connected successfully");
};
