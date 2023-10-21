const mongoose = require('mongoose');

const UserResponses = mongoose.model('UserResponses',{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
  selectedOption: {
    type: [String]
  }
})

module.exports = UserResponses;
