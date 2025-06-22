// for chat purposes we are using stream so based on the user id we get a token and we are sending it back as the response

import {generateStreamToken} from "../lib/stream.js"

export async function getStreamToken(req,res){
    try{
        const token = generateStreamToken(req.user.id);
        res.status(200).json({token});
    }
    catch(error){
        console.log("Error in getStreamToken controller",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
