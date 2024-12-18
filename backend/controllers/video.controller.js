import {Video} from '../models/video.model.js';

// @desc    Get all videos
// @route   GET /api/videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new video
// @route   POST /api/videos
// const createVideo = async (req, res) => {
//   const { title, description, videoUrl, thumbnailUrl, } = req.body;

//   try {
//     const newVideo = new Video({ title, description, videoUrl, thumbnailUrl, user:req.body.user });
//     await newVideo.save();
//     res.status(201).json(newVideo);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// @desc    Create a new video
// @route   POST /api/videos
const createVideo = async (req, res) => {
  const { title, description, videoUrl, thumbnailUrl } = req.body;

  try {
    if (!title || !description || !videoUrl || !thumbnailUrl) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Automatically assign the logged-in user's ID to the video
    const video = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      user: req.user.id,  // Use user ID from the JWT token
    });

    // Save the new video to the database
    await video.save();

    res.status(201).json({ message: 'Video created successfully', video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Delete a video
// @route   DELETE /api/videos/:id
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if the logged-in user is the owner of the video
    if (video.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }

    await video.remove();
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllVideos, createVideo, deleteVideo };
