import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true }, // URL of the video
  thumbnailUrl: { type: String, required: true }, // URL of the thumbnail
  tags: [{ type: String }], // Tags for searching videos
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the video
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who disliked the video
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Video uploader
  createdAt: { type: Date, default: Date.now },
});

export const Video = mongoose.model('Video', videoSchema);

