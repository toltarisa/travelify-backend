const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Photo = mongoose.model('photo', photoSchema);

module.exports = Photo;
