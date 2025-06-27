import React, { useState } from 'react'
import { FaLanguage } from "react-icons/fa";
import {  
  useMutation,
  useQueryClient,
 } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
// was planning ot creatre a seperate function for this component but realised these props may be passed only once allowing the Status button to remain unchanged unless we cause a rerender each time the value of one these variables get changed 


function SignUpPage() {
// for a second this page wasnt visible cause i had put the react hook const  in {} instead of [] 
  const [signupData,setSignUpData]=useState({
    fullName:"",
    email:"",
    password:"",
  });
   // Now we have to send this collected data to the backend signup endpoint so that it can create an account 
  // we are doing this using tanstack query 
  // Access the client
  const queryClient = useQueryClient();

  //Queries, all these values are getting returned to us we jsut rename the mutate function as signupMutation
  const {isPending,mutate:signupMutation}
    // the signup data is already in json format 

    // now we already destructuring this data and based on the pending or error status change button color
 
    // Mutations
  = useMutation({
    mutationFn: async()=>{
              const response = await axiosInstance.post("/auth/signup",signupData);
  return response.data;
    },
    onSuccess: () => {
      // show success popup
        toast("Success",{
              style:{
                background:"green"
              }
            });
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
    onError:(error)=>{
        toast(`Error ${error}`,{
                  style:{
                    background:"red"
                  }
                })
    }
  })
 
  function handleSignUp(e){
     e.preventDefault();
    signupMutation(signupData);
  }

  return (
    <div className="grid grid-cols-2  grid-flow-row justify-center m-5 lg:max-w-screen lg:max-h-full"
   >
     
      <div className=' grid grid-flow-col col-span-1 grid-cols-1 grid-rows-6 gap-y-1 border rounded-lg border-primary/50  pl-2 auto-rows-min
        '>
       
      <div className="row-span-1 text-primary text-2xl flex flex-row gap-x-3 items-center">
       <FaLanguage  className='justify-self-center text-6xl'/> 
        Streamify
      </div>
       <div className="row-span-1 grid grid-auto-flow-col ">
        <p className='text-xl'>
          Create an Account
        </p>
        <p>
          Join LangConnect and start your language learning journey today
        </p>
       </div>
        <div className="row-span-1 grid grid-auto-flow-col">
          <label className='pb-0.5 '>Full Name</label>
          <textarea 
          placeholder='Your Name' 
          value={signupData.fullName}          
          onChange={(e)=>setSignUpData({...signupData,fullName:e.target.value})}
          className='textarea  justify-items-center rounded-lg  border-1 border-primary focus:border-neutral
            w-70 h-5'></textarea>
        </div>
         <div className="row-span-1 grid grid-auto-flow-col"
         >
            <label className='pb-0.5'>Email</label>
          <textarea placeholder="Your Email" 
          value={signupData.email}
        
          onChange={(e)=>setSignUpData({...signupData,email:e.target.value})}className='textarea  justify-items-center rounded-lg  border-1 border-primary
           focus:border-blue-800  w-70 h-5' ></textarea>
         </div>
          <div className="row-span-1 grid grid-auto-flow-col pb-1">
              <label className='pb-0.5'>Password</label>
          <textarea placeholder="Password" 
          value={signupData.password}
        
          onChange={(e)=>setSignUpData({...signupData,password:e.target.value})}className='textarea  justify-items-center rounded-lg  border-1 border-primary
           focus:border-blue-800  w-70 h-5 pr-9'
          ></textarea>
          </div>
           <div className="row-span-1 justify-items-center">
            
               <label className='flex  text-base gap-x-4 pl-2 flex-row items-center'>
    <input type="checkbox" className="checkbox  checkbox-md justify-self-start justify-start checkbox-secondary" />
   Click to agree to our terms and conditions
  </label>
  <button className='bg-secondary/50  rounded-lg border w-40 justify-self-center pb-2 place-self-center' type="submit" onClick={handleSignUp}
              >Create Account</button>
            
            {isPending===true &&
             <span className="loading loading-spinner text-primary justify-self-center"/>

             }
              <p  className='justify-self-center'>
                Already have an account ?
                <a href='/login' className='text-info '>Log In</a>
              </p>
           </div>
      </div>
      
      <div className='col-span-1 grid   grid-cols-5 grid-rows-3 grid-flow-col border bg-primary/25 gap-y-0  rounded-lg  auto-rows-min'>
     
        <img src='./webcall_image.jpg' alt="webcall image"  className="row-span-2 col-span-3 col-start-2  pt-4 object-scale-down justify-self-center 
      
         w-full  h-auto"/>
      {/* </div> */}
      <div className='row-span-1 col-span-4 col-start-2 pr-2'>
      <p className='text-xl pb-2'> Connect with language partners worldwide</p>
  
       <p> Practise conversations , make friends and improve your language skills together </p>
      </div>
      </div>
    
      
      </div>
  )
}

export default SignUpPage