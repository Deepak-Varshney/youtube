import mongoose from 'mongoose';

const connectDB = async () => {
  const URI = process.env.MONGO_URI || "localhost:27017/youtubeclonemern"
  try {
    const conn = await mongoose.connect(URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;