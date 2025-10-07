import express from 'express';
const router = express.Router();

import * as habitController from '../controllers/habitController.js';
import { protect } from '../middleware/authMiddleware.js';

const auth = protect;

router.get('/', protect, habitController.getHabits);
router.post('/', protect, habitController.createHabit);
router.put('/:id', protect, habitController.updateHabit);
router.delete('/:id', protect, habitController.deleteHabit);
router.post('/:id/track', protect, habitController.trackHabit);

export default router;