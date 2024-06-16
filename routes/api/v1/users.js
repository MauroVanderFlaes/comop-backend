const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/api/v1/users');

const auth = require('../../../middleware/auth');

router.get("/", auth.verifyApiKey, usersController.getAllUsers);
router.get("/:gymId", auth.verifyApiKey, usersController.getUsersByGymId);

router.post("/profileImg/:id", auth.verifyApiKey, usersController.uploadProfileImg);
router.get("/profileImg/:id", auth.verifyApiKey, usersController.getProfileImg);

router.post('/signup', auth.verifyApiKey, usersController.createUser);
router.post("/login", auth.verifyApiKey, usersController.loginUser);
router.get("/credits/:id", auth.verifyApiKey, usersController.getUserCredits);

module.exports = router;
