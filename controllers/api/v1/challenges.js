const Challenges = require('../../../models/Challenge');

const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenges.find();
        res.json({
            "status": "success",
            "data": challenges
        });
    } catch (error) {
        res.json({
            "status": "error",
            "message": error.message
        });
    }
};


const createChallenges = async (req, res) => {
    console.log(req.body);
    console.log("Creating challenge");
    try {
        let { title, description, imageUrl, time, category, credits, active, completed, requiredImages, imageDescriptions } = req.body;
        completed = completed.toLowerCase() === 'yes';  // Zet "Yes" om naar boolean

        if (requiredImages < 1 || requiredImages > 3) {
            return res.json({
                status: "error",
                message: "Number of required images must be between 1 and 3"
            });
        }

        if (!Array.isArray(imageDescriptions) || imageDescriptions.length !== requiredImages) {
            return res.json({
                status: "error",
                message: "Image descriptions array length must match the number of required images"
            });
        }


        console.log('image url:', imageUrl);

        let challenge = new Challenges({
            title,
            description,
            imageUrl,
            time,
            category,
            credits,
            active, // New challenges are not active until they are
            completed,
            requiredImages,
            imageDescriptions

        });
        await challenge.save();
        res.json({
            status: "success",
            data: challenge
        });
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        });
    }
};

const updateChallenges = async (req, res) => {
    try {
        let { title, description, imageUrl, time, category,active, completed, requiredImages, imageDescriptions } = req.body;
        completed = completed.toLowerCase() === 'yes';  // Zet "Yes" om naar boolean

        if (requiredImages < 1 || requiredImages > 3) {
            return res.json({
                status: "error",
                message: "Number of required images must be between 1 and 3"
            });
        }

        if (!Array.isArray(imageDescriptions) || imageDescriptions.length !== requiredImages) {
            return res.json({
                status: "error",
                message: "Image descriptions array length must match the number of required images"
            });
        }

        let challenge = await Challenges.findOneAndUpdate({ _id: req.params.id }, {
            title,
            description,
            imageUrl,
            time,
            category,
            active,
            completed,
            requiredImages,
            imageDescriptions
        }, { new: true });
        res.json({
            "status": "success",
            "data": challenge
        });
    } catch (error) {
        res.json({
            "status": "error",
            "message": error.message
        });
    }
};

const toggleActive = async (req, res) => {
    try {
        const challengeId = req.params.id; // Assuming the challenge ID is passed as a parameter
        const challenge = await Challenges.findById(challengeId);
        if (!challenge) {
            return res.json({
                status: "error",
                message: "Challenge not found"
            });
        }
        challenge.active = !challenge.active; // Toggle the active field
        const updatedChallenge = await challenge.save();
        res.json({
            status: "success",
            data: updatedChallenge
        });
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        });
    }
};

const getActiveChallenges = async (req, res) => {
    try {
        const activeChallenges = await Challenges.find({ active: true });
        res.json({
            status: "success",
            data: activeChallenges
        });
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        });
    }
}

module.exports.getChallenges = getChallenges;
module.exports.createChallenges = createChallenges;
module.exports.updateChallenges = updateChallenges;
module.exports.toggleActive = toggleActive;
module.exports.getActiveChallenges = getActiveChallenges;
