const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    title: { 
        type: String, required: true 
    },

    description: { 
        type: String, required: true 
    },

    imageUrl: {
        type: String, required: false    
    },

    time: {
        type: Number, required: true 
    },

    category: {
        type: String, required: true 
    },

    credits: {
        type: Number, required: true 
    },

    active: {
        type: Boolean, required: true 
    },

    completed: {
        type: Boolean, required: true 
    },

    requiredImages: {
        type: Number, required: true, min: 1, max: 3 
    },

    imageDescriptions: {
        type: [String], required: true, validate: {
            validator: function(v) {
                return v.length === this.requiredImages;
            },
            message: 'Image descriptions array length must match the number of required images'
        }
    }
});

const Challenges = mongoose.model('Challenges', challengeSchema);

module.exports = Challenges;
