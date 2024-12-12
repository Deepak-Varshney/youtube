import {Comment} from '../models/comment.model.js';

// @desc    Get all comments for a video
// @route   GET /api/comments/:videoId
const getCommentsForVideo = async (req, res) => {
  const { videoId } = req.params;

  try {
    const comments = await Comment.find({ video: videoId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a comment to a video
// @route   POST /api/comments
const createComment = async (req, res) => {
  const { video, user, text } = req.body;

  try {
    const newComment = new Comment({ video, user, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the logged-in user is the owner of the comment or video owner
    if (comment.user.toString() !== req.user.id && comment.video.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.remove();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCommentsForVideo, createComment, deleteComment };
