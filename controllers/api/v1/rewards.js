const Reward = require('../../../models/Reward');

const createReward = async (req, res) => {
  try {
    const { name, goal, benefits, gymId, credits, imageUrl } = req.body;

    if (!name || !goal || !benefits || !gymId || !credits) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide name, description, gymId, and credits.'
      });
    }

    const reward = new Reward({
      name,
      goal,
      benefits,
      gymId,
      credits,
      imageUrl
    });

    await reward.save();

    res.status(201).json({
      status: 'success',
      message: 'Reward created successfully',
      data: {
        reward
      }
    });
  } catch (error) {
    console.error('Error creating reward:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
};

const getAllRewardsByGymId = async (req, res) => {
  const { gymId } = req.params;

  try {
    const rewards = await Reward.find({ gymId });

    res.status(200).json({
      status: 'success',
      data: {
        rewards
      }
    });
  } catch (error) {
    console.error('Error getting rewards by gymId:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
};

const updateReward = async (req, res) => {
    try {
        const rewardId = req.params.id;
        const { name, goal, benefits, gymId, credits, imageUrl } = req.body;
    
        const reward = await Reward
            .findByIdAndUpdate(rewardId, {
                name,
                goal,
                benefits,
                gymId,
                credits,
                imageUrl
            }, { new: true });

        res.json({
            status: 'success',
            data: reward
        });
    }
    catch (error) {
        res.json({
            status: 'error',
            message: error.message
        });
    }
}


module.exports = {
  createReward,
  getAllRewardsByGymId,
  updateReward  
};
