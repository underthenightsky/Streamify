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