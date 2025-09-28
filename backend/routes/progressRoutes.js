import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addProgress, getProgress } from "../controllers/progressController.js";

const router = express.Router();

router.post("/", protect, addProgress);
router.get("/:habitId", protect, getProgress);

export default router;
