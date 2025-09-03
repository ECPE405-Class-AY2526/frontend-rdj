import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "I hear you!" });
});

app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log("Server is running on port 5001");
  });
});
