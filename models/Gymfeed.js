// models/Gymfeed.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gymfeedSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: 'Challenges',
    required: true
  },
  requiredImages: {
    type: Number,
    required: true,
    min: 1,
    max: 3
  },
  uploadedImages: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === this.requiredImages;
      },
      message: 'Uploaded images array length must match the number of required images'
    }
  },
  completionDate: {
    type: Date,
    default: Date.now
  }
});

const Gymfeed = mongoose.model('Gymfeed', gymfeedSchema);

module.exports = Gymfeed;
