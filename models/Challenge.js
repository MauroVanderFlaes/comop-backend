const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    time: { type: Number, required: true },
    category: { type: String, required: true },
    completed: { type: Boolean, required: true }
});

const Challenges = mongoose.model('Challenges', challengeSchema);

module.exports = Challenges;
