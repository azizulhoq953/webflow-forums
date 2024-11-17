// routes/adminRoutes.js
const authenticateUser = require('../middleware/authenticateUser');
const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const Forum = require('../models/Forum'); // Replace with your forum model

// Route to get all forum data (accessible only by admins)
router.get('/admin', verifyAdmin, async (req, res) => {
  try {
    const forums = await Forum.find(); // Fetch all forum data
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all forum data' });
  }
});
router.delete('/:id', authenticateUser, verifyAdmin, async (req, res) => {
  try {
    const forumPost = await Forum.findByIdAndDelete(req.params.id);
    if (!forumPost) {
      return res.status(404).json({ message: 'Forum post not found' });
    }
    res.status(200).json({ message: 'Forum post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting forum post' });
  }
});

module.exports = router;
