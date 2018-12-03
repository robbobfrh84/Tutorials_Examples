var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  favoriteBook: {
    type: String,
    required: false,
    trim: true
  },
  photo: {
    type: String,
    required: true,
    trim: true
  }
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
