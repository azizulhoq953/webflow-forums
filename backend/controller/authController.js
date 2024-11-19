// authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is set up

const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || !user.comparePassword(password)) { // Assuming comparePassword method is set
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      token,
      isAdmin: user.isAdmin, // Send 'isAdmin' status in the response
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signin };
