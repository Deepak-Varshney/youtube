import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Send response without password
    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user and send JWT
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare entered password with stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token in HttpOnly cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only for production environments (use HTTPS)
      sameSite: 'Strict',
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      message: 'Login successful',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout user and clear cookie
// @route   GET /api/auth/logout
const logoutUser = (req, res) => {
  res.cookie('access_token', '', { httpOnly: true, maxAge: 0 });
  res.status(200).json({ message: 'Logged out successfully' });
};

export { registerUser, loginUser, logoutUser };
