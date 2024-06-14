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
    required: function() {
      return !this.skipped;
    },
    validate: {
      validator: function(v) {
        // Only validate length if not skipped
        return this.skipped || (Array.isArray(v) && v.length === this.requiredImages);
      },
      message: 'Uploaded images array length must match the number of required images'
    }
  },

  skipped: {
    type: Boolean,
    default: false
  },

  completionDate: {
    type: Date,
    default: Date.now
  },

  acceptances: 
  { 
    type: [Schema.Types.ObjectId],
    ref: 'Users', default: [] 
  },

  rejections: {
    type: [Schema.Types.ObjectId],
    ref: 'Users', default: [] 
    } 

});

const Gymfeed = mongoose.model('Gymfeed', gymfeedSchema);

module.exports = Gymfeed;
