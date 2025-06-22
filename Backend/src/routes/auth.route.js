import express from "express";
import {login,logout,signup,onBoard} from "../controllers/auth.controller.js";
import {protectedRoute} from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);
router.post("/onboarding",protectedRoute,onBoard);

// check if user is logged in 
router.get("/me",protectedRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
});
export default router;