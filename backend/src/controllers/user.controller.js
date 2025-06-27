import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js"; // make sure to import from .js otherwise the IDE will think we are trying to import from a installed package

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;
    // here we are extracting data from the user field sent in the request we can alternatively await the data from the User model createrd in the models folder

    // now to get new friends first they should share a language and as the list could involve people i am already friends with and myself ignore them
    const recommendedUsers = await User.find({
   
      $and: [
        // important : filter's results
        { _id: { $ne: currentUserId } }, // dont recommend the user
        { _id: { $nin: currentUser.friends } }, // dont recommend people who are already friends with the user
        { isOnboarded: true }, // dont recommend people who have not completed the whole procedure and just signed up without specifying their native and learning language
      ],
    });
    // why was i passing recomended users in a json ?
    // its a normal result 
    res.status(200).json( recommendedUsers );
  } catch (error) {
    console.log(`error while getting recommended users, ${error}`);
    return res
      .status(500)
      .json({ message: `error while getting recommended users, ${error}` });
  }
}

export async function getMyFriends(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      ); // we need to await the reposnse from the database as it will take some time to find andd send this data

    res.status(200).json(user.friends);
    // return the response with the populated fields
  } catch (error) {
    console.log("Error in getting user freinds, in user controllers", error);
    return res
      .status(500)
      .json({ message: "Error while getting friends in user controllers" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const userId = req.user.id;
    const { id: recipientId } = req.params;
    // extract the recipiendId from the id field of the request params

    // prevent sending friend request to self
    if (userId === recipientId) {
      return res
        .status(400)
        .json({ message: "Can't send friend request to self" });
    }
    // check if recipient exists or not
    const recipient = await  User.findById(recipientId);
    if (recipient == null) {
      return res.status(404).json({ message: "No User Found with that Id" });
    }
    // check if user already friends with user
    // this means that the last check was passed and the recipieent exists
    if (recipient.friends.includes(userId)) {
      return res.status(400).json({ message: "Aready friends with recipient" });
    }
    // now we need to check if the user has already sent a request to the recipient
    if (
      FriendRequest.findOne({
        $or: [
          { recipientId: recipientId, senderId: userId },
          { recipientId: userId, senderId: recipientId },
        ],
      })
    ) {
      return res.status(400).json({ message: "Already sent a friend request" });
      // the reason we checked if i a friend request exists between 1 and 2 and not just from 1 to 2 is to avoid the case where 1 and 2 are alreaddy friends but 2 clicks an earlier friend request from 1 , this may lead to double entries in the database
    }
    const friendRequestObject = await FriendRequest.create({
      senderId: userId,
      recipientId: recipientId,
    });
    // create an object from the Friend Request Model and send it as the response
    res.status(201).json(friendRequestObject);
  } catch (error) {
    console.log("error in sending friend request", error);
    return res
      .status(500)
      .json({ message: "error wwhile creating friend request" });
  }
}
export async function acceptfriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequestObject = await FriendRequest.findById(requestId);
    // first we are checking if the friend request exists or not
    if (!friendRequestObject) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    // then we check if the recipient and sender are ccidentally the same
    if (friendRequestObject.senderId === friendRequestObject.recipientId) {
      return res
        .status(404)
        .json({ message: "Recipient and sender are the same" });
    }
    // to check if the user accidentally go link for a random friend request not meant for them
    if (req.user.id !== friendRequestObject.recipientId.toString()) {
      return res
        .status(403)
        .json({ message: "This Friend request is not for you " });
    }
    // now that all check are present add the sender id to the recievers frined list and vice versa
    await User.findByIdAndUpdate(friendRequestObject.recipientId, {
      $addToSet: { friends: friendRequestObject.senderId },
    });
    await User.findByIdAndUpdate(friendRequestObject.senderId, {
      $addToSet: { friends: friendRequestObject.recipientId },
    });
  } catch (error) {
    console.log("error while accepting friend request", error);
    return res
      .status(500)
      .json({ message: "Error while accepting the friend request" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    // this is to show all pending friend request to the user
    const userId = req.user.id;
    const incomingReqs = await FriendRequest.find({
      recipientId: userId,
      status: "pending",
    }).populate(
      "senderId",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    // to show all the friend request we ahve accepted in the past 
    const acceptedReqs = await FriendRequest.find({
      senderId: userId,
      status: "accepted",
    }).populate(
      "senderId",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    // we are returning all the requests sent to su that are either pending or ahve been accepted
    return res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getOutgoingFriendRequest(req, res) {
  try {
    // to find all friend requests we have sent that are still unanswered
    const userId = req.user.id;
    const outGoingRequest = await FriendRequest.find({
      senderId: userId,
      status: "pending",
    }).populate(
      "recipientId",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    res.status(200).json(outGoingRequest);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
