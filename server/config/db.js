import mongoose from "mongoose";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const connectDB = async (maxRetries = 5, delayMs = 3000) => {
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

  let attempt = 0;
  while (true) {
    try {
      attempt += 1;
      await mongoose.connect(uri);
      // Post-connect ping to verify DB responsiveness
      if (mongoose.connection?.db) {
        await mongoose.connection.db.admin().command({ ping: 1 });
      }
      console.log("MongoDB connected successfully (attempt", attempt, ")");
      return;
    } catch (error) {
      console.error(
        `Error connecting to the database (attempt ${attempt}/${maxRetries}):`,
        error?.message || error
      );
      if (attempt >= maxRetries) {
        throw error;
      }
      await delay(delayMs);
    }
  }
};
