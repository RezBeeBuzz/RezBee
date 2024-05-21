const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  is_verified: { type: Boolean, default: false },
  restaurant: Object
});

module.exports = mongoose.model('Manager', ManagerSchema);
