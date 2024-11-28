import { generateToken } from '../lib/sendToken.js';
import bcrypt from 'bcryptjs'; 
import User from '../model/UserModel.js';

export const postUserDetail = async (req, res) => {
  try {
    const { username, firstName, lastName, password, confirmPassword } =
      req.body;

    if (!username || !firstName || !lastName || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generate JWT and set as cookie
    const token = generateToken(savedUser._id, res);

    return res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Server error, please try again later.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required.' });
    }

    const passwordString = String(password);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(passwordString, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT and set as cookie
    const token = generateToken(user._id, res);

    return res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Server error, please try again later.' });
  }
};

export const signOut = (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    };

    res.clearCookie('token', cookieOptions);

    // Clear the 'jwt' cookie
    res.clearCookie('jwt', cookieOptions);

    return res.status(200).json({
      message: 'Sign-out successful',
    });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, 'Server error');
  }
};


