
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authenticateUser = async (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = authenticateUser;

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming a User model to check roles

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting Bearer token
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};


module.exports = authenticateUser;
