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

const getGymByQrCode = async (req, res) => {
    try {
        const scannedQrCode = req.params.qrCode;
        const gym = await Gyms.findOne({ qrCode: scannedQrCode });
        if (gym) {
            res.json({
                status: 'success',
                data: gym
            });
        } else {
            res.json({
                status: 'error',
                message: 'No matching gym found'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        });
    }
};




const postGyms = async (req, res) => {
    try {
        let { name, address, city, qrCode } = req.body;
        let imageBuffer = null;

        if (req.file) {
            imageBuffer = fs.readFileSync(req.file.path);
        }
        
        let gyms = new Gyms({
            name,
            address,
            city,
            qrCode,
            image: imageBuffer
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

        const gym = await Gyms.findOne({ qrCode: scannedQrCode });
        
        if (gym) {
            console.log("Matching gym found", gym);
            req.session.gymId = gym._id;
            res.json({
                "status": "success",
                "data": gym
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
module.exports.getGymByQrCode = getGymByQrCode;