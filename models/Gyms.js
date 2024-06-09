const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gymSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    adress: {
        type: String, 
        required: false
    },
    city: {
        type: String, 
        required: true
    }, 
    qrCode: {
        type: String, 
        required: true
    },
    imageData: {
        type: String, 
        required: true
    }
})
const Gyms = mongoose.model('Gyms', gymSchema);

module.exports = Gyms;