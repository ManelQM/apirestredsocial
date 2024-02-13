const Follow = require("../models/follow");

const followUserIds = async (userId) => {
  let following = await Follow.find({ user: userId })
    .select({ _id: 0, __v: 0, user: 0 })
    .exec((error, follows) => follows);
  if (!following) {
    return res.status(400).json({
      status: "missing",
      message: "Cant find list of followers/following",
    });
  }
  let followers = false;
  return {
    following,
    followers,
  };
};



module.exports = {
  followUserIds,
};
