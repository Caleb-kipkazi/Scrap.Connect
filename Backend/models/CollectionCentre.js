const mongoose = require('mongoose');

const collectionCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model('CollectionCenter', collectionCenterSchema);
