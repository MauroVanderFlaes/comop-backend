const express = require('express');
const router = express.Router();
const rewardsController = require('../../../controllers/api/v1/rewards');

const auth = require('../../../middleware/auth');

router.post('/create', auth.verifyApiKey, rewardsController.createReward);
router.get('/:gymId', auth.verifyApiKey, rewardsController.getAllRewardsByGymId);
// update reward
router.put('/:id', auth.verifyApiKey, rewardsController.updateReward);
router.post('/buy/:id', auth.verifyApiKey, rewardsController.buyReward);

module.exports = router;
