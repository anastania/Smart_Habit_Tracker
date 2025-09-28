import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getOverview,
  getHabitAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/overview", protect, getOverview);
router.get("/:habitId", protect, getHabitAnalytics);

export default router;
