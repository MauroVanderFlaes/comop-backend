require('dotenv').config();

const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['comop-api-key'];
    if (!apiKey || apiKey !== process.env.COMOP_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

module.exports = {verifyApiKey};