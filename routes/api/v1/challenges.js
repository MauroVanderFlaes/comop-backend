const express = require('express');
const router = express.Router();
const challengesController = require('../../../controllers/api/v1/challenges');

router.post('/', challengesController.createChallenges);
router.get('/', challengesController.getChallenges);
router.put('/:id', challengesController.updateChallenges);

module.exports = router;
