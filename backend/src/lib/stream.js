import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream api key or secret is missing");
}
const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export async function  upsertStreamUser (userData){
    try{
        // as soon as a user signs in we create a user with that userId(from mongo) and store them in the db
        await streamClient.upsertUsers([userData]);
        return userData;
    }
    catch(error){
        console.log("error in upserting user",error);
    }   
};

export function generateStreamToken(userId){
    try{
        //ensure id is a string 
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    }
    catch(error){
        console.log("error in generating Stream token",error);
    }
}