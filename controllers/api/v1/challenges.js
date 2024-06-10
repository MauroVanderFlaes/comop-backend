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
        let { title, description, imageUrl, time, category, credits, active ,completed } = req.body;
        completed = completed.toLowerCase() === 'yes';  // Zet "Yes" om naar boolean

        console.log('image url:', imageUrl);

        let challenge = new Challenges({
            title,
            description,
            imageUrl,
            time,
            category,
            credits,
            active, // New challenges are not active until they are
            completed
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
        let { title, description, imageUrl, time, category,active, completed } = req.body;
        completed = completed.toLowerCase() === 'yes';  // Zet "Yes" om naar boolean
        let challenge = await Challenges.findOneAndUpdate({ _id: req.params.id }, {
            title,
            description,
            imageUrl,
            time,
            category,
            active,
            completed
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
