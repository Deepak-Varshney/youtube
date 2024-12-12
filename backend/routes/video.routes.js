import express from 'express';
import { getAllVideos, createVideo, deleteVideo } from '../controllers/video.controller.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all videos
// @route   GET /api/videos
router.get('/', getAllVideos);

// @desc    Create a new video (requires authentication)
// @route   POST /api/videos
router.post('/', protect, createVideo);

// @desc    Delete a video (only the video uploader can delete it)
// @route   DELETE /api/videos/:id
router.delete('/:id', protect, deleteVideo);

export default router;
