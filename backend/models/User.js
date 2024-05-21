const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  phone_number: { type: String, unique: true },
  email: String,
  payment_methods: Array,
  reservations: Array
});

module.exports = mongoose.model('User', UserSchema);
