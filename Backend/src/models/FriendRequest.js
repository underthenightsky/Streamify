import mongoose from "mongoose";

const friendRequestSchema= mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true // since we are trying to store the objectId it has a specific data type 
        // also since we storing a filed of the User model we need provide a refernce to that as well
        // Initially i had stored this data as int 
        //This is the better format 
    },
    recipientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    // here we also need to track the status of the friend request whether it has accepted or not and furthur store it to prepare a list of all pending or sent friend request
    status:{
        type:String,
        enum:["pending","accepted"],
        default : "pending"
    }

},{timestamps:true}) // since all data is being sent and recived in JSON format we send this in JSON format

const FriendRequest = mongoose.model("FriendRequest",friendRequestSchema);// specify the name we want our model to have and the relevant schema

export default FriendRequest;