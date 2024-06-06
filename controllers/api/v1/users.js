const User = require('../../../models/User');
require('../../../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 12;

const createUser = async (req, res) => {
    try {
        let { username, email, password, credits } = req.body;
        console.log(req.body);

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
            password: hashedPassword,
            credits,
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


const loginUser = async (req, res) => {
    let { identifier, password } = req.body;

    // Input validatie
    if (!identifier || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide email/username and password.'
        });
    }

    // Controleer of de gebruiker bestaat op basis van e-mail of gebruikersnaam
    let user = await User.findOne({ 
        $or: [{ email: identifier }, { username: identifier }] 
    });

    if (!user) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid email/username or password.'
        });
    }

    // Controleer of het wachtwoord overeenkomt
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid email/username or password.'
        });
    }

    // Creëer JWT-token
    const token = jwt.sign(
        { user_id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );


  return res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    data: { user, token },
  });
};

const getAllUsers = async (req, res) => {
    //get all users
    try {
        let users = await User.find();
        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
}

const getUserCredits = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                credits: user.credits
            }
        });
    } catch (error) {
        console.error('Error getting user credits:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};



module.exports = {createUser, loginUser, getAllUsers ,getUserCredits};
