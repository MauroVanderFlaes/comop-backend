const express = require('express');
const router = express.Router();
const rewardsController = require('../../../controllers/api/v1/rewards');

router.post('/create', rewardsController.createReward);
router.get('/:gymId', rewardsController.getAllRewardsByGymId);
// update reward
router.put('/:id', rewardsController.updateReward);
router.post('/buy/:id', rewardsController.buyReward);

module.exports = router;
