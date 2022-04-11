const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moodSchema = new Schema({
  username: String,
  rating: {type: Number, min: 1, max: 5, default: 5},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Mood', moodSchema);