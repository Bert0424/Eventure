const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // add fields later
});

module.exports = mongoose.model('User', userSchema);