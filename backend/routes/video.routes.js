import express from 'express';
import { getAllVideos, createVideo, deleteVideo, likeVideo, dislikeVideo, getRandomVideos, getTrendingVideos, getVideosByTags, searchVideos, getVideosByIds } from '../controllers/video.controller.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all videos
// @route   GET /api/videos
router.get('/all', getAllVideos);

router.get('/', getVideosByIds);

// @desc    Create a new video (requires authentication)
// @route   POST /api/videos
router.post('/', protect, createVideo);

// @desc    Delete a video (only the video uploader can delete it)
// @route   DELETE /api/videos/:id
router.delete('/:id', protect, deleteVideo);

// Route to like a video (Protected)
router.put('/:id/like', protect, likeVideo);

// Route to dislike a video (Protected)
router.put('/:id/dislike', protect, dislikeVideo);

// Route to get random videos
router.get('/random', getRandomVideos);

// Route to get trending videos (sorted by views)
router.get('/trending', getTrendingVideos);

// Route to get videos by tags
router.get('/tags', getVideosByTags);

// Route to search videos by title
router.get('/search', searchVideos);

export default router;
