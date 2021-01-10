const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
  country: {
    type: String,
  },
  description: {
    type: String,
    max: 300,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  category: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Category',
  },
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
});

const Location = mongoose.model('location', locationSchema);

module.exports = Location;
