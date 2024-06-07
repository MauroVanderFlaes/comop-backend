const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/api/v1/users');

router.get("/", usersController.getAllUsers);
router.get("/:gymId", usersController.getUsersByGymId);

router.post("/profileImg/:id", usersController.uploadProfileImg);
router.get("/profileImg/:id", usersController.getProfileImg);

router.post('/signup', usersController.createUser);
router.post("/login", usersController.loginUser);
router.get("/credits/:id", usersController.getUserCredits);

module.exports = router;
