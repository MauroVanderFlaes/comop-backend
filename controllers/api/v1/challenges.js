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
        let { title, description, image, time, category, completed } = req.body;
        completed = completed.toLowerCase() === 'yes';  // Zet "Yes" om naar boolean

        let challenge = new Challenges({
            title,
            description,
            image,
            time,
            category,
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
        let { title, description, image, time, category, completed } = req.body;
        completed = completed.toLowerCase() === 'yes';  // Zet "Yes" om naar boolean
        let challenge = await Challenges.findOneAndUpdate({ _id: req.params.id }, {
            title,
            description,
            image,
            time,
            category,
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

module.exports.getChallenges = getChallenges;
module.exports.createChallenges = createChallenges;
module.exports.updateChallenges = updateChallenges;
