const Gymfeed = require('../../../models/Gymfeed');
const Challenges = require('../../../models/Challenge');
const Users = require('../../../models/User');

const getGymfeed = async (req, res) => {
  try {
    const gymfeeds = await Gymfeed.find()
      .populate('userId', 'username email imgUrl gymId')
      .populate('challengeId', 'title description');

    res.json({
      status: 'success',
      data: gymfeeds
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
};
    
const postGymfeed = async (req, res) => {
    try {
        const { userId, challengeId, uploadedImages, skipped } = req.body;
    
        // Fetch the challenge to get the required number of images
        const challenge = await Challenges.findById(challengeId);
        if (!challenge) {
          return res.json({
            status: 'error',
            message: 'Challenge not found'
          });
        }
    
        const { requiredImages } = challenge;
    
        // Validate the uploaded images length
        if (!skipped && (!Array.isArray(uploadedImages) || uploadedImages.length !== requiredImages)) {
          return res.json({
            status: 'error',
            message: 'Uploaded images array length must match the number of required images unless skipped'
          });
        }
    
        const gymfeed = new Gymfeed({
          userId,
          challengeId,
          requiredImages,
          uploadedImages: skipped ? [] : uploadedImages,
          skipped
        });
    
        await gymfeed.save();
    
        res.json({
          status: 'success',
          data: gymfeed
        });
      } catch (error) {
        res.json({
          status: 'error',
          message: error.message
        });
      }
    };

    const getCompletedChallengesByUserId = async (req, res) => {
        try {
          const userId = req.params.userId;
          const user = await Users.findById(userId);
          console.log('user:', user);
          if (!user) {
            return res.json({
              status: 'error',
              message: 'User not found'
            });
          }
      
          const gymfeeds = await Gymfeed.find({ userId })
            .populate('challengeId', 'title description')
            .populate('userId', 'username email imgUrl');
      
          res.json({
            status: 'success',
            data: gymfeeds
          });
        } catch (error) {
          res.json({
            status: 'error',
            message: error.message
          });
        }
      };


      const acceptGymfeed = async (req, res) => {
        try {
          const { userId } = req.body;
          const gymfeed = await Gymfeed.findById(req.params.id);
      
          if (!gymfeed) {
            return res.status(404).json({
              status: 'error',
              message: 'Gymfeed not found'
            });
          }
      
          // Get the user who posted the gymfeed
          const user = await Users.findById(gymfeed.userId);
          if (!user) {
            return res.status(404).json({
              status: 'error',
              message: 'User not found'
            });
          }
      
          // Count gym members with the same gymId as the user who posted the gymfeed
          const gymMembersCount = await Users.countDocuments({ gymId: user.gymId });
      
          console.log('gymMembersCount:', gymMembersCount);
          const halfGymMembers = Math.ceil(gymMembersCount / 2);
      
          // Check if the user has already accepted or rejected this gymfeed
          if (gymfeed.acceptances.includes(userId)) {
            return res.status(400).json({
              status: 'error',
              message: 'User has already accepted this gymfeed'
            });
          }
      
          if (gymfeed.rejections.includes(userId)) {
            return res.status(400).json({
              status: 'error',
              message: 'User has already rejected this gymfeed'
            });
          }
      
          // Add user to acceptances
          gymfeed.acceptances.push(userId);
          gymfeed.rejections = gymfeed.rejections.filter(id => id.toString() !== userId);
      
          if (gymfeed.acceptances.length >= halfGymMembers) {
            // Check if this is the first time reaching the required acceptances
            if (!gymfeed.completed) {
              gymfeed.completed = true;
              user.credits += 100; // Award credits to the user who posted the gymfeed
              await user.save();
            }
          } else {
            // If not enough acceptances, ensure it's marked as not completed
            gymfeed.completed = false;
          }
      
          await gymfeed.save();
          res.json({ status: 'success', data: gymfeed });
        } catch (error) {
          res.status(500).json({ status: 'error', message: error.message });
        }
      };

      const rejectGymfeed = async (req, res) => {
        try {
          const { userId } = req.body;
          const gymfeed = await Gymfeed.findById(req.params.id);
      
          if (!gymfeed) {
            return res.status(404).json({
              status: 'error',
              message: 'Gymfeed not found'
            });
          }
      
          // Get the user who posted the gymfeed
          const user = await Users.findById(gymfeed.userId);
          if (!user) {
            return res.status(404).json({
              status: 'error',
              message: 'User not found'
            });
          }
      
          // Count gym members with the same gymId as the user who posted the gymfeed
          const gymMembersCount = await Users.countDocuments({ gymId: user.gymId });
      
          console.log('gymMembersCount:', gymMembersCount);
          const halfGymMembers = Math.ceil(gymMembersCount / 2);
      
          // Check if the user has already rejected or accepted this gymfeed
          if (gymfeed.rejections.includes(userId)) {
            return res.status(400).json({
              status: 'error',
              message: 'User has already rejected this gymfeed'
            });
          }
      
          if (gymfeed.acceptances.includes(userId)) {
            return res.status(400).json({
              status: 'error',
              message: 'User has already accepted this gymfeed'
            });
          }
      
          // Remove user from acceptances if already present
          gymfeed.acceptances = gymfeed.acceptances.filter(id => id && id.toString() !== userId);
      
          // Add user to rejections
          gymfeed.rejections.push(userId);
      
          // Check if at least half of the gym members have rejected this gymfeed
          if (gymfeed.rejections.length >= halfGymMembers) {
            // Remove this gymfeed from the gymfeed collection
            await Gymfeed.findByIdAndDelete(gymfeed._id);
            return res.json({
              status: 'success',
              message: 'Gymfeed removed due to rejection by more than half of the gym members'
            });
          } else if (gymfeed.acceptances.length >= halfGymMembers) {
            // Mark the gymfeed as completed if enough acceptances
            gymfeed.completed = true;
            user.credits += 100; // Award credits to the user who posted the gymfeed
            await user.save();
          } else {
            // If not enough rejections or acceptances, ensure it's marked as not completed
            gymfeed.completed = false;
          }
      
          await gymfeed.save();
          res.json({ status: 'success', data: gymfeed });
        } catch (error) {
          res.status(500).json({ status: 'error', message: error.message });
        }
      };


      const getCompletedChallengesByGymId = async (req, res) => {
        console.log('getCompletedChallengesByGymId');
        try {
          const gymId = req.params.gymId;
          console.log('gymId:', gymId);
      
          // Find all users in the specified gym
          const users = await Users.find({ gymId });
      
          // Array to hold completed challenges for all users in the gym
          let completedChallenges = [];
      
          // For each user, find their completed gym feeds (challenges)
          for (const user of users) {
            const gymfeeds = await Gymfeed.find({ userId: user._id, completed: true })
              .populate('challengeId', 'title description')
              .populate('userId', 'username email imgUrl');
      
            completedChallenges = completedChallenges.concat(gymfeeds);
          }
      
          res.json({
            status: 'success',
            data: completedChallenges
          });
        } catch (error) {
          res.status(500).json({
            status: 'error',
            message: error.message
          });
        }
      };


module.exports.getGymfeed = getGymfeed;
module.exports.postGymfeed = postGymfeed;
module.exports.getCompletedChallengesByUserId = getCompletedChallengesByUserId;
module.exports.acceptGymfeed = acceptGymfeed;
module.exports.rejectGymfeed = rejectGymfeed;
module.exports.getCompletedChallengesByGymId = getCompletedChallengesByGymId;
