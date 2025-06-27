import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protectedRoute(req,res,next){
    try{
        // the mistake i had made here was checking the response for the jwt cookie instead of the request 
        // if the request has not been sent by us how will it have the cookie we just got the request from the user to make sure this route is protected and only signed in /logged in users with the cookie acan access it
         const token = req.cookies.jwt;
        
        // now that we have gotten the token , we can verify if the JWT code in it is corect or not and based on that we know if the message has been tampered with or not
        // first we have to check if any token has been sent or not 
        if(!token){
            return res.status(401).json({message:"Unauthorized : No token sent."});
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        // if token has been tampered with 
        if (!decode){
            return res.status(401).json({message:"Unauthorized: Invalid Token"});
        }
        // find the user based on the userId obtained fromn the token
        const user= await User.findById(decode.userId).select("-password");
        // send all data except the password to prevent it from being shared openly 
        if(!user){
            return res.status(401).json({message:"Unauthorized - User Not found"});
        }
        req.user = user; // passing whole user object obtained from the database to the req while will be furthur passed onto the next() function
        next();
    }
    catch(error){
        console.log("Error in protectRouteMiddleware",error);
        res.status(500).json({message:"error while protecting route"});
    }
}