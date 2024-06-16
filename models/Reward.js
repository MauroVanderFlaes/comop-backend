const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RewardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },

  benefits: {
    type: String,
    required: true
  },

  gymId: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },

  imageUrl: {
    type: String,
    required: false
  }


});

const Reward = mongoose.model('Reward', RewardSchema);

module.exports = Reward;
