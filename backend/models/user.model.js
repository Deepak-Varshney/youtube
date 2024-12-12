import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Use hashing for security
  profilePicture: { type: String, default: "" }, // URL of the profile picture
  subscribers: { type: Number, default: 0 },
  subscribedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users they are subscribed to
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], // Videos uploaded by the user
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
