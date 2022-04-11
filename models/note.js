const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  username: String,
  text : String,
  rating: {type: Number, min: 1, max: 5, default: 5}
});

module.exports = mongoose.model('Note', noteSchema);