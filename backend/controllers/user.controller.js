// // import User from '../models/user.model.js';

// // // @desc    Get all users
// // // @route   GET /api/users
// // const getAllUsers = async (req, res) => {
// //   try {
// //     const users = await User.find();
// //     res.status(200).json(users);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // @desc    Create a new user
// // // @route   POST /api/users
// // const createUser = async (req, res) => {
// //   const { username, email, password } = req.body;

// //   try {
// //     const newUser = new User({ username, email, password });
// //     await newUser.save();
// //     res.status(201).json(newUser);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // };

// // export { getAllUsers, createUser };


// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import {User} from '../models/user.model.js';

// // @desc    Register a new user
// // @route   POST /api/users/register
// const registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     // Send response without password
//     res.status(201).json({
//       username: newUser.username,
//       email: newUser.email,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Login user and send JWT
// // @route   POST /api/users/login
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare entered password with stored password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Set token in HttpOnly cookie
//     res.cookie('access_token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Only for production environments (use HTTPS)
//       sameSite: 'Strict',
//       maxAge: 3600000, // 1 hour
//     });

//     res.status(200).json({
//       message: 'Login successful',
//       user: { username: user.username, email: user.email },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export { registerUser, loginUser };
import {User} from '../models/user.model.js';
// @desc    Get the current user's profile
// @route   GET /api/users/me
const getUserProfile = async (req, res) => {
  try {
    // Fetch user from database using the ID from the JWT token
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUserProfile };


// @desc    Update the current user's profile
// @route   PUT /api/users/me
const updateUserProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Fetch the user from the database
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile fields
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      message: 'User profile updated successfully',
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { updateUserProfile };


// @desc    Delete user account
// @route   DELETE /api/users/me
const deleteUser = async (req, res) => {
  try {
    // Find the user by their ID (from the JWT token)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user's account
    await user.remove();

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { deleteUser };
