import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.put("/:id", protect, updateHabit);
router.delete("/:id", protect, deleteHabit);

export default router;
