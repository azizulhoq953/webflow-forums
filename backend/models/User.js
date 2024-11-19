const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String },
  address: { type: String },
  image: { type: String },  // Image URL or path to the profile image
  isAdmin: { type: Boolean, default: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);


// models/User.js

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
