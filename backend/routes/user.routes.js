// import express from 'express';
// import { getAllUsers, createUser } from '../controllers/user.controller.js';

// const router = express.Router();

// // @desc    Get all users
// // @route   GET /api/users
// router.get('/', getAllUsers);

// // @desc    Create a new user
// // @route   POST /api/users
// router.post('/', createUser);

// export default router;


import express from 'express';
import { getUserProfile, updateUserProfile, deleteUser } from '../controllers/user.controller.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get current user's profile
// @route   GET /api/users/me
router.get('/me', protect, getUserProfile);

// @desc    Update current user's profile
// @route   PUT /api/users/me
router.put('/me', protect, updateUserProfile);

// @desc    Delete current user's account
// @route   DELETE /api/users/me
router.delete('/me', protect, deleteUser);

export default router;
