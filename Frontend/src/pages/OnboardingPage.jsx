import React from 'react'
import { useState } from 'react';
import { getProfilePicLink } from '../lib/api';
import {  
  useMutation,
  useQueryClient,
 } from '@tanstack/react-query';
import {axiosInstance} from "../lib/axios";
import toast from 'react-hot-toast';
import useAuthUser from "../hooks/useAuthUser";

function Onboarding() {
  // importing authUser hook 
    const { authUser } = useAuthUser();

  // now since we have created the basic structure of the page we can now focus on the functinality :
  // 1) we need a useState to store all the data 
  //2)an option to set the profile pic of the user 
  //3) a handle mutation to send this data to the endpoint 
  //4) we would also need a useAuth hook to get the userID of the individual so that we can update this onboarding data to the user Id of that particular user
   const [onBoardingData,setOnBoardingData]=useState({
      fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "Hindi",
    learningLanguage: authUser?.learningLanguage || "English",
    location: authUser?.location || "New Delhi, India",
    profilePic:"https://api.dicebear.com/9.x/micah/svg",
    });
    // now to change the profile photo of the user
    async function HandlePhotoChange(){
      const avatar = await getProfilePicLink();
     console.log(avatar)
      setOnBoardingData(onBoardingData=>{
      return {...onBoardingData,profilePic:`https://i.pravatar.cc/150?u=${avatar}`}}
      )
    }
    // now we need to create a mutation function to update this data 
     // Access the client
      const queryClient = useQueryClient();
    
      //Queries, all these values are getting returned to us we jsut rename the mutate function as signupMutation
      const {isPending ,mutate:onBoardMutation}
       = useMutation({
          mutationFn: async()=>{
                    const response = await axiosInstance.post("/auth/onboarding",onBoardingData);
                    console.log("Mutation Data Response",Response )
        return response.data;
          },
          onSuccess: () => {
            // Invalidate and refetch
            toast("Success",{
              style:{
                background:"green"
              }
            });
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
          },
              onError:(error)=>{
                toast(`Error ${error}`,{
                  style:{
                    background:"red"
                  }
                })
              }
        });

        function handleOnboarding(e){
          e.preventDefault();
          console.log("Onboarding Data", onBoardingData)
         onBoardMutation(onBoardingData);
        }
  return (
    <div className="grid  grid-rows-6 grid-flow-col  max-w-5xl xl:w-5xl xl:justify-self-center mt-1 mb-1 rounded-3xl xl:max-h-screen" data-theme="forest"
    >
      <div className='text-3xl row-span-1 text-primary justify-self-center self-center-safe '>
        <p className='pb-2'>Complete Your Profile</p>    
       
    <img src={onBoardingData.profilePic} className='rounded-full w-24  justify-self-center'/>

    </div>
    <button className='btn btn-primary row-span-1/2 justify-self-center self-center' onClick={HandlePhotoChange}>Generate Random Avatar</button>
      <div className='row-span-1 justify-items-start pl-4'>
        <p>Full Name</p>
        <textarea placeholder="Full Name" 
         value={onBoardingData.fullName}          
          onChange={(e)=>setOnBoardingData({...onBoardingData,fullName:e.target.value})}className='textarea textarea-primary w-full h-1'></textarea>
      </div>

        <div className='row-span-1 justify-items-start pl-4'>
        <p>Bio</p>
        <textarea placeholder="Tell others what you and your learning goals"
         value={onBoardingData.bio}          
          onChange={
            (e)=>setOnBoardingData({...onBoardingData,bio:e.target.value})
          }
         className='textarea textarea-primary w-110'></textarea>
      </div>

      <div className='row-span-1 pl-4 gap-x-5 flex flex-row '>
    <div>
  <p className="fieldset-legend pb-1 text-base">Select your native language</p>
  <select defaultValue={onBoardingData.nativeLanguage} className="select select-sm select-primary"
  value={onBoardingData.nativeLanguage}
  onChange={
     (e)=>setOnBoardingData({...onBoardingData,nativeLanguage:e.target.value})
  }
  >
    <option disabled={true}>Your Native Language</option>
    <option>English</option>
    <option>Hindi</option>
    <option>French</option>
  </select>
  </div>  

    <div>
  <p className="fieldset-legend pb-1 text-base">Select your learning language</p>
  <select defaultValue={onBoardingData.learningLanguage} className="select select-sm select-primary"
  value={onBoardingData.learningLanguage}
  onChange={(e)=>{
    setOnBoardingData({
      ...onBoardingData,learningLanguage:e.target.value
    })
  }}
  >    
    <option disabled={true}>Your Learning Language</option>
    <option>English</option>
    <option>Hindi</option>
    <option>French</option>
  </select>
  </div> 

      </div>

      <div className='row-span-1 pl-4 flex flex-col '>
          <p className="fieldset-legend pb-1 text-base">Your Location</p>
  <select defaultValue="New Delhi,India" className="select select-sm select-primary "
   value={onBoardingData.location}
  onChange={(e)=>{
    setOnBoardingData({
      ...onBoardingData,location:e.target.value
    })
  }}
  >
    <option disabled={true}>City,Country</option>
    <option>New Delhi,India</option>
    <option>Washington DC,USA</option>
    <option>Paris,France</option>
  </select>

  {/* using ternary operators we could also use {if isPending ==="true" && <Component>} to show the neccessary component  */}
     {(isPending)?
     <span className="loading loading-spinner text-primary self-center mt-2 pb-2"/>
    : <button className='btn btn-primary self-center mt-2 pb-2' onClick={handleOnboarding}>Complete Onboarding</button>}
      
  </div>
    </div>
  )
}

export default Onboarding