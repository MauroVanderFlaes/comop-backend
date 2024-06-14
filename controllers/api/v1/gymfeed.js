const Gymfeed = require('../../../models/Gymfeed');
const Challenges = require('../../../models/Challenge');
const User = require('../../../models/User');

const getGymfeed = async (req, res) => {
    try {
        const gymfeeds = await Gymfeed.find()
          .populate('userId', 'username email imgUrl')
          .populate('challengeId', 'title description');

          const totalMembers = await User.countDocuments();
          gymfeeds.forEach(feed => {
            feed.isAccepted = feed.acceptances.length >= totalMembers / 2;
          });
    
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
            const { userId } = req.body; // Destructure userId from req.body
            console.log('userId:', userId);
            const gymfeed = await Gymfeed.findById(req.params.id);
            console.log('gymfeed:', gymfeed);

            if (!gymfeed) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Gymfeed not found'
                });
            }
    
            if (!gymfeed.acceptances.includes(userId)) {
                gymfeed.acceptances.push(userId);
                gymfeed.rejections = gymfeed.rejections.filter(id => id.toString() !== userId);
            }
    
            await gymfeed.save();
            res.json({ status: 'success', data: gymfeed });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    };
    

    const rejectGymfeed = async (req, res) => {
      try {
          const { userId } = req.body; // Destructure userId from req.body
          const gymfeed = await Gymfeed.findById(req.params.id);
  
          if (!gymfeed) {
              return res.status(404).json({
                  status: 'error',
                  message: 'Gymfeed not found'
              });
          }
  
          // Remove userId from acceptances (including null values)
          gymfeed.acceptances = gymfeed.acceptances.filter(id => id && id.toString() !== userId);
  
          // Check if userId already exists in rejections
          if (!gymfeed.rejections.includes(userId)) {
              gymfeed.rejections.push(userId);
          }
  
          await gymfeed.save();
          res.json({ status: 'success', data: gymfeed });
      } catch (error) {
          res.status(500).json({ status: 'error', message: error.message });
      }
  };

module.exports.getGymfeed = getGymfeed;
module.exports.postGymfeed = postGymfeed;
module.exports.getCompletedChallengesByUserId = getCompletedChallengesByUserId;
module.exports.acceptGymfeed = acceptGymfeed;
module.exports.rejectGymfeed = rejectGymfeed;
