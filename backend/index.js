import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db.js';
import userRoutes from './routes/user.routes.js';
import videoRoutes from './routes/video.routes.js';
import commentRoutes from './routes/comment.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Use CORS middleware to allow frontend (Vite app) to make requests to backend
app.use(cors({
  origin: 'http://localhost:5173',  // Vite frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // List the methods you expect
  credentials: true, // Allow cookies if needed
}));
app.use(express.json());
app.use(cookieParser()); 
// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);


// Health Check Route
app.get('/ping', (req, res) => {
  res.send('Server is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Use the auth routes



