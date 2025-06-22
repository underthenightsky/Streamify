import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app =express();
const PORT=process.env.PORT;

import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import userRoutes from "./routes/user.route.js";
app.use(cors({ // prevent cross origin requests to prevent malicios requests
    origin:"http://localhost:5173", // this is the frontend url only request from this url are permitted 
    credentials :true// allow frontend to send cookies
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`);
    connectDB();
});
