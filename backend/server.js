// // server.js

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const forumRoutes = require('./routes/forumRoutes');
// const path = require('path');

// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// app.use('/api/forums', forumRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const forumRoutes = require('./routes/forumRoutes');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const path = require('path');
const authenticateUser = require('./middleware/authenticateUser'); 
const Forum = require('./models/Forum');  // Make sure this import is at the top
const verifyAdmin = require('./middleware/verifyAdmin'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files
// app.get('/api/forums', async (req, res) => {
//   try {
//     const forums = await Forum.find().populate('user', 'username'); // Populate user data with username only
//     res.json(forums);
//   } catch (err) {
//     res.status(500).send('Error fetching forums');
//   }
// });
app.delete('/api/forums/:id', authenticateUser, verifyAdmin, async (req, res) => {
  try {
    const forumPost = await Forum.findByIdAndDelete(req.params.id);
    if (!forumPost) {
      return res.status(404).json({ message: 'Forum post not found' });
    }
    res.status(200).json({ message: 'Forum post deleted successfully' });
  } catch (error) {
    console.error('Error deleting forum post:', error);
    res.status(500).json({ message: 'Error deleting forum post' });
  }
});
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes for forum and auth
app.use('/api/forums', forumRoutes);
app.use('/api/auth', authRoutes); // Use authRoutes for authentication
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/forums', upload.array('images'), (req, res) => {
  // Handle the uploaded files and form data here
  console.log(req.files);
  console.log(req.body);
  res.send('Files uploaded successfully');
});
