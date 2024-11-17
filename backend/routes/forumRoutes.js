
const express = require('express');
const multer = require('multer');
const path = require('path');
const Forum = require('../models/Forum');

const router = express.Router();

// Existing multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to handle forum submission
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { note } = req.body;
    const images = req.files.map((file) => file.path);

    const newForum = new Forum({ note, images });
    await newForum.save();

    res.status(201).json({ message: 'Forum submitted successfully!' });
  } catch (error) {
    console.error('Error during forum submission:', error);
    res.status(500).json({ message: 'Error submitting forum', error: error.message });
  }
});

// Route to update a forum post
router.put('/:id', upload.array('images', 5), async (req, res) => {
    try {
      const { note } = req.body;
      const images = req.files ? req.files.map((file) => file.path) : []; // If new images are uploaded
  
      // Find the forum post by ID and update it
      const updatedForum = await Forum.findByIdAndUpdate(
        req.params.id,
        { note, images },
        { new: true } // Return the updated document
      );
  
      if (!updatedForum) {
        return res.status(404).json({ message: 'Forum post not found' });
      }
  
      res.status(200).json({ message: 'Forum updated successfully', updatedForum });
    } catch (error) {
      console.error('Error updating forum:', error);
      res.status(500).json({ message: 'Error updating forum', error: error.message });
    }
  });

// Route to get all forums
router.get('/', async (req, res) => {
  try {
    const forums = await Forum.find(); // Fetch all forums from MongoDB
    res.status(200).json(forums);
  } catch (error) {
    console.error('Error fetching forums:', error);
    res.status(500).json({ message: 'Error fetching forums', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
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
