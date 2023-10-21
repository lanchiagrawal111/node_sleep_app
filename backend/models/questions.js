const mongoose = require('mongoose');

const questions = mongoose.model('questions', {
  content: {
      type: String
  },
  options: {
      type: [String]
  },
  nextQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }
})

module.exports = questions;
