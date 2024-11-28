import { generateToken } from '../lib/sendToken.js';
import bcrypt from 'bcryptjs'; // Optional: to hash the password before saving
import User from '../model/UserModel.js';

export const postUserDetail = async (req, res) => {
  try {
    const { username, firstName, lastName, password, confirmPassword } =
      req.body;
    console.log(req.body);

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
      token: token, // Optionally return the token in the response body as well
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Server error, please try again later.' });
  }
};
