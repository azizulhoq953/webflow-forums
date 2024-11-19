
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


// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Assuming User model

// const authenticateUser = async (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Expecting Bearer token
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id); // Find user by decoded ID

//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     // Attach the user role (or any other relevant data) to the request
//     req.user = user;
//     next(); // Pass control to the next middleware
//   } catch (error) {
//     return res.status(400).json({ message: 'Invalid token' });
//   }
// };

// In the login route, include the role in the response

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user || !user.comparePassword(password)) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign(
//     { id: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: '1h' }
//   );

//   // Send back the token and the user's role
//   res.json({
//     token,
//     role: user.role,  // Assuming 'role' is a field in the User model
//   });
// };

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user || !user.comparePassword(password)) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign(
//     { id: user._id, isAdmin: user.isAdmin }, // Include isAdmin in the token payload
//     process.env.JWT_SECRET,
//     { expiresIn: '1h' }
//   );

//   res.json({
//     token,
//     isAdmin: user.isAdmin,  // Return isAdmin directly in the response (optional)
//   });
// };
