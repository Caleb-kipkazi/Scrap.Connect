// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Assuming you have a User model
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // You can access this in your route as req.user
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = { verifyToken };
   
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path to your User model

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // keep compatibility with existing code

    // Optional: fetch full user object
    if (decoded.id) {
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.fullUser = user; // use this in new routes
      }
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = auth;
