import express from 'express';
import { getCommentsForVideo, createComment } from '../controllers/comment.controller.js';

const router = express.Router();

// @desc    Get all comments for a video
// @route   GET /api/comments/:videoId
router.get('/:videoId', getCommentsForVideo);

// @desc    Add a comment to a video
// @route   POST /api/comments
router.post('/', createComment);

export default router;
