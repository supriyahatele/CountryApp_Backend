const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
  searchHistory: [{ type: String }],
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};