const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gymSchema = new Schema({
    name: String,
    adress: String,
    city: String,
    qrCode: String
})
const Gyms = mongoose.model('Gyms', gymSchema);

const getGyms = (req, res) => {
    res.json({
        gyms: [
            {
                name: "Gym 1",
                adress: "123 Main St",
                city: "Denver",
                state: "CO",
                zip: "80202"
            },
        ]
    })
}

const postGyms = async (req, res) => {
    try {
        let { name, address, city, qrCode } = req.body;
        
        let gyms = new Gyms({
            name,
            address,
            city,
            qrCode
        });

        const savedGym = await gyms.save();

        res.json({
            "status": "success",
            "data": savedGym
        });
    } catch (error) {
        res.json({
            "status": "error",
            "message": error.message
        });
    }
}

module.exports.getGyms = getGyms;
module.exports.postGyms = postGyms;