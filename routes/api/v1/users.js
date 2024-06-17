const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/api/v1/users');

const auth = require('../../../middleware/auth');

router.get("/", auth.verifyApiKey, usersController.getAllUsers);
router.get("/:gymId", auth.verifyApiKey, usersController.getUsersByGymId);

router.post('/signup', auth.verifyApiKey, usersController.createUser);
router.post("/login", auth.verifyApiKey, usersController.loginUser);
router.get("/credits/:id", auth.verifyApiKey, usersController.getUserCredits);

router.get("/rewards/:id", auth.verifyApiKey, usersController.getUserWithRewards);
router.delete("/rewards/:userId/:rewardId", auth.verifyApiKey, usersController.removeUserReward);

router.post("/profileImg/:id", auth.verifyApiKey, usersController.uploadProfileImg);
router.get("/profileImg/:id", auth.verifyApiKey, usersController.getProfileImg);



module.exports = router;
