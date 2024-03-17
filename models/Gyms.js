const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gymSchema = new Schema({
    name: String,
    adress: String,
    city: String,
    qrCode: String,
    imageData: Buffer
})
const Gyms = mongoose.model('Gyms', gymSchema);

module.exports = Gyms;