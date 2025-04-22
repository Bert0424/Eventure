import express from "express";
import authRoutes from "./authRoutes.js";
// TODO: Implement user and event routes
import userRoutes from "./userRoutes.js";
import eventRoutes from "./eventRoutes.js";
const router = express.Router();

// Auth routes
router.use("/auth", authRoutes);

// User routes
router.use("/users", userRoutes);

// Event routes
router.use("/events", eventRoutes);

export default router;