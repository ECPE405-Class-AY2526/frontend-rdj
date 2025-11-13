import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Clean and validate MONGO_URI for common mistakes in env setup
    const raw = process.env.MONGO_URI || "";
    let uri = raw.trim().replace(/^['"]|['"]$/g, ""); // strip surrounding quotes
    if (uri.startsWith("MONGO_URI=")) {
      uri = uri.split("MONGO_URI=")[1].trim(); // user pasted key=value into value field
    }
    if (!/^mongodb(\+srv)?:\/\//.test(uri)) {
      throw new Error(
        'Invalid scheme: MONGO_URI must start with "mongodb://" or "mongodb+srv://". Remove quotes and do not include "MONGO_URI=" in the value.'
      );
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error?.message || error);
    throw error;
  }
};
