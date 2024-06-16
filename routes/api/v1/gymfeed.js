const express = require('express');
const router = express.Router()
const gymfeedController = require('../../../controllers/api/v1/gymfeed');
const auth = require('../../../middleware/auth');

router.get('/', auth.verifyApiKey, gymfeedController.getGymfeed);
router.post('/', auth.verifyApiKey, gymfeedController.postGymfeed);

// get completed challenges by user id
router.get('/:userId', auth.verifyApiKey, gymfeedController.getCompletedChallengesByUserId);
router.post('/:id/accept', auth.verifyApiKey, gymfeedController.acceptGymfeed);
router.post('/:id/reject', auth.verifyApiKey, gymfeedController.rejectGymfeed);
router.get('/completed/:gymId', auth.verifyApiKey, gymfeedController.getCompletedChallengesByGymId) 


module.exports = router