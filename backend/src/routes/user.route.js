import express from "express";
import {protectedRoute} from "../middleware/auth.middleware.js";
import { acceptfriendRequest, getMyFriends,getRecommendedUsers, sendFriendRequest,getFriendRequests,getOutgoingFriendRequest } from "../controllers/user.controller.js";
const router = express.Router();
router.use(protectedRoute);

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);
router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptfriendRequest);
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequest);
export default router;