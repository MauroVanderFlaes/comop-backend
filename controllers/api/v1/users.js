const User = require('../../../models/User');
require('../../../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 12;


const createUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        // Input validatie
        if (!username || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide username, email, and password.'
            });
        }

        // Controleer of de gebruiker al bestaat
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: 'User already exists.'
            });
        }

        // Hash het wachtwoord
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creëer een nieuwe gebruiker
        let user = new User({
            username,
            email,
            password: hashedPassword
        });

        user = await user.save();

        // Creëer JWT-token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: {
                user,
                token
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

module.exports = {createUser};
