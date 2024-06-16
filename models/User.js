// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    default: 0
  },
  imgUrl: {
    type: String,
  },
  // get gymId from gym
  gymId: {
    type: String,
  },
  // New field for updates
  newsletter: {
    type: Boolean,
  },

  rewards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reward'
    }
  ]
  
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
