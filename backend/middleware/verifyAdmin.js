const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming a User model to check roles

const verifyAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token for debugging
    console.log('Decoded token:', decoded);

    // Find the user associated with the token ID
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    if (!user.isAdmin) {  // Assuming you are using isAdmin as a boolean
      console.log('User is not an admin');
      return res.status(403).json({ message: 'You are not authorized to access this' });
    }

    // Attach the user to the request object for further use
    req.user = user;
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = verifyAdmin;


// In your backend login route
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !user.comparePassword(password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin }, // Include isAdmin in the token payload
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Send back the token and isAdmin
  res.json({
    token,
    isAdmin: user.isAdmin,
  });
};
