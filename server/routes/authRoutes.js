import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      email,
      password,
      role: role || "user", // Default to 'user' if not specified
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, loginAsRole } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (loginAsRole && user.role !== loginAsRole) {
      const roleLabel = loginAsRole === "admin" ? "Admin" : "User";
      return res.status(403).json({
        message: `Access denied. This account is not registered as ${roleLabel}.`,
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all users (admin only)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user role (admin only)
router.patch("/users/:id/role", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, select: "-password" }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete user (admin only)
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
