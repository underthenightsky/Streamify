import { axiosInstance } from "./axios";
// we are using this axios instance to so send the data to all the necessary endpoints (api functions)

export  async function signup(signupData){
    const response = await axiosInstance.post("/auth/signup",signupData);
    return response.data;
}

export async function login(loginData){
    const response = await axiosInstance.post("/auth/login",loginData);
    return response.data;
}

export async function logout(){
    const response = await axiosInstance.post("auth/logout");
    return response.data;
}

export async function completeOnboarding(onboardingData){
    const response = await axiosInstance.post("auth/onboarding",onboardingData);
    return response.data;
}

export async function getAuthUser(){
    try{
        const response = await axiosInstance.get("auth/me");
        return response.data;
    }
    catch(error){
        console.log("Error while getting user",error);
        return null;
    }
}


export async function getProfilePicLink(){
    const response= Math.random().toString(36).substring(2,7)
 
   console.log("from img gen api ",response)
    return response.toString();
}

export async function getUserFriends(){
    // we dont need the userId of the individual because cause we can get it from auth/me
    try{
        const response = await axiosInstance.get("/user/friends")
        return response.data;
    }
    catch(error){
        console.log("Error while getting user friends",error);
        return null
    }
}

export async function getRecommendedUsers() {
      try{
        const response = await axiosInstance.get("/user")
        return response.data;
    }
    catch(error){
        console.log("Error while getting user friends",error);
        return null
    }
}
export async function getOutgoingFriendReqs() {
      try{
        const response = await axiosInstance.get("/user/outgoing-friend-requests")
        return response.data;
    }
    catch(error){
        console.log("Error while getting outgoing friend requests",error);
        return null
    }
}

export async function sendFriendRequest(userId){
    try{
    const response=await axiosInstance.post(`/user/friend-request/${userId}`);
    return response.data;
    }
    catch(error){
        console.log("Error while sending friend requests",error);
        return null
    }
    
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/user/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
    console.log("accept friend req , api.js",requestId)
  const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}