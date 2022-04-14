const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  username: String,
  text : String,
});

const moodSchema = new Schema({
  username: String,
  rating: {
    type: String,
    enum: ['Anxious', 'Sad', 'Tired', 'Optimistic', 'Groovy']
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  notes: [noteSchema]
});



module.exports = mongoose.model('Mood', moodSchema);

