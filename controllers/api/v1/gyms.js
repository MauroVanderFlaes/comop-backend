const Gyms = require('../../../models/Gyms');

const getGyms = async (req, res) => {
    try {
        const gyms = await Gyms.find();
        res.json({
            "status": "success",
            "data": gyms
        });
    } catch (error) {
        res.json({
            "status": "error",
            "message": error.message
        });
    }
}

const postGyms = async (req, res) => {
    try {
        let { name, address, city, qrCode } = req.body;

        const imageData = Buffer.from(req.body.imageData, 'base64');
        
        let gyms = new Gyms({
            name,
            address,
            city,
            qrCode,
            imageData: imageData
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

const compareQrCode = async (req, res) => {
    try {
        
        const scannedQrCode = req.body.qrCode;
        

        const gyms = await Gyms.find();

        
        gyms.forEach(gym => {
            // console.log("QR code", gym.qrCode);
        });

        // console.log("this is the scanned qr code", scannedQrCode);
        // console.log("this is the qr code", qrCode);

        const matchingGym = gyms.find(gym => gym.qrCode === scannedQrCode);


        if (matchingGym) {
            console.log("Matching gym found", matchingGym);
            res.json({
                "status": "success",
                "data": matchingGym
            });
        } else {
            res.json({
                "status": "error",
                "message": "No matching gym found"
            });
        }
    } catch (error) {
        res.json({
            "status": "error",
            "message": error.message
        });
    }
}

module.exports.getGyms = getGyms;
module.exports.postGyms = postGyms;
module.exports.compareQrCode = compareQrCode;