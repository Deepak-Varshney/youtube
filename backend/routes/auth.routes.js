import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/auth/register
router.post('/register', registerUser);

// @desc    Login a user and get JWT token
// @route   POST /api/auth/login
router.post('/login', loginUser);

// @desc    Logout user
// @route   GET /api/auth/logout
router.get('/logout', logoutUser);

export default router;
