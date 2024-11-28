import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;
console.log(SECRET_KEY);

// Generate JWT token and set it as a cookie
export const generateToken = (userId, res) => {
  try {
    if (!res) {
      throw new Error('Response object (res) is required');
    }

    if (!SECRET_KEY) {
      throw new Error('SECRET_KEY is not defined in the environment variables');
    }

    const token = jwt.sign({ userId }, SECRET_KEY, {
      expiresIn: '1d', // Token expires in 1 day
    });

    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days (in milliseconds)
      httpOnly: true, // Cookie accessible only by the web server, not client-side JS
      sameSite: 'strict', // Strict cookie policy
      secure: process.env.NODE_ENV !== 'development', // Secure flag set to true in production
    });

    return token;
  } catch (err) {
    console.error('Error generating token and setting cookie:', err);
    throw new Error('Token generation failed');
  }
};
