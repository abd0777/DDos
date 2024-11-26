import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;  // Get token from cookies (you can also check headers, if used)

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token

      req.user = await User.findById(decoded.userId).select('-password');  // Decode the token and find the user

      next();  // Proceed to the next middleware (route handler)
    } catch (error) {
      console.error(error);
      res.status(401);  // Unauthorized if token verification fails
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);  // Unauthorized if no token is found
    throw new Error('Not authorized, no token');
  }
});

export { protect };
