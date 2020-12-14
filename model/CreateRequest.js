const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  operationType: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  locationId: {
    type: mongoose.Types.ObjectId,
  },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
});

const CreateRequest = mongoose.model('createrequest', requestSchema);

module.exports = CreateRequest;
