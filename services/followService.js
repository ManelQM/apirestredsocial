const Follow = require("../models/follow");

const followUserIds = async (user) => {
  try {
    let following = await Follow.find({ user: user })
      .select({ followed: 1, _id: 0 })
      .exec();

    let followers = await Follow.find({ followed: user })
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

const followThisUser = async (user) => {
  let following = await Follow.find({
    user: user,
    // followed: followed,
  });
  console.log("Esto viene algo o que", user);

  let follower = await Follow.find({
    // user: followed,
    followed: user,
  });

  console.log("FollowingService:", following);
  console.log("FollowerService:", follower);
  return {
    following,
    follower,
  };
};



module.exports = {
  followUserIds,
  followThisUser,
};
