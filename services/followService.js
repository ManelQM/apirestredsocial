const Follow = require("../models/follow");

const followUserIds = async (userId) => {
  try {
    let following = await Follow.find({ user: userId })
      .select({ followed: 1, _id: 0 })
      .exec();

    let followers = await Follow.find({ followed: userId })
      .select({ user: 1, _id: 0 })
      .exec();

    if (!following || !followers) {
      return res.status(400).json({
        status: "missing",
        message: "Error follow service, cant .find()",
      });
    }

    return {
      following,
      followers,
    };
  } catch (error) {
    return {};
  }
};

const followThisUser = async(userId, profileUserId) => {
  try{
    let following = await Follow.findOne({user:userId, followed:profileUserId })
    .select({followed :1, _id: 0})
    .exec();
    let followers = await Follow.find({user:userId})
    .select({user: 1, _id: 0})
    .exec(); 
  }catch{

  }

}


module.exports = {
  followUserIds,
};
