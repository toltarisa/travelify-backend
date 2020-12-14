const mongoose = require('mongoose');

const deleteSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Types.ObjectId,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  operationType: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const DeleteRequest = mongoose.model('deleterequest', deleteSchema);

module.exports = DeleteRequest;
