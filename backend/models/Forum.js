// models/Forum.js

const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;


// const mongoose = require('mongoose');

// const forumSchema = new mongoose.Schema({
//   note: { type: String, required: true },
//   images: [{ type: String }],
// });

// const Forum = mongoose.model('Forum', forumSchema); // Make sure the model is created like this

// module.exports = Forum;
