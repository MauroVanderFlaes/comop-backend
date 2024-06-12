const Gymfeed = require('../../../models/Gymfeed');
const Challenges = require('../../../models/Challenge');
const Users = require('../../../models/User');

const getGymfeed = async (req, res) => {
    try {
        const gymfeeds = await Gymfeed.find()
          .populate('userId', 'username email')
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
        const { userId, challengeId, uploadedImages } = req.body;
    
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
        if (!Array.isArray(uploadedImages) || uploadedImages.length !== requiredImages) {
          return res.json({
            status: 'error',
            message: 'Uploaded images array length must match the number of required images'
          });
        }
    
        const gymfeed = new Gymfeed({
          userId,
          challengeId,
          requiredImages,
          uploadedImages
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


module.exports.getGymfeed = getGymfeed;
module.exports.postGymfeed = postGymfeed;
module.exports.getCompletedChallengesByUserId = getCompletedChallengesByUserId;