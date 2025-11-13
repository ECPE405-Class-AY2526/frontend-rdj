import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// Resolve __dirname for ESM and load env for local dev (Render uses dashboard env)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load server/.env when running locally; Render provides env vars at runtime
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// Security & core middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting (basic global limiter)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);

app.get("/", (req, res) => {
  res.json({ message: "I hear you!" });
});

// Health check: reports server up, mongoose readyState, and optional ping
app.get("/health", async (req, res) => {
  const state = mongoose.connection?.readyState;
  let ping = "skipped";
  try {
    if (state === 1 && mongoose.connection?.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
      ping = "ok";
    }
  } catch (e) {
    ping = "fail";
  }
  res.json({ status: "ok", dbState: state, ping });
});

app.use("/api/auth", authRoutes);

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5001;

    // Serve built client in production (single Render service option)
    if (process.env.NODE_ENV === "production") {
      const clientDist = path.join(__dirname, "..", "client", "dist");
      app.use(express.static(clientDist));
      // Express v5 + path-to-regexp v6: use a compatible catch-all
      app.get("(.*)", (req, res) => {
        res.sendFile(path.join(clientDist, "index.html"));
      });
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "Failed to start server due to DB connection error:",
      err?.message || err
    );
    process.exit(1);
  });
