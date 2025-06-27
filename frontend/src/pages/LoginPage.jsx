import React ,{ useState } from 'react'
import { FaLanguage } from "react-icons/fa";
import {  
  useMutation,
  useQueryClient,
 } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
function LoginPage() {
  // the useState to store the data
  const [loginData,setLoginData]=useState({
      email:"",
      password:"",
    });

    // create a mutation to send the data 
    // Access the client
  const queryClient = useQueryClient();

  //Queries, all these values are getting returned to us we jsut rename the mutate function as signupMutation
  const {isPending,mutate:loginMutation}
    // the signup data is already in json format 

    // now we already destructuring this data and based on the pending or error status change button color
 
    // Mutations
  = useMutation({
    mutationFn: async()=>{
              const response = await axiosInstance.post("/auth/login",loginData);
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
    // create a function to handle login 
 function handleLogin(e){
   e.preventDefault();
    loginMutation(loginData);
 }
  return (
      <div className="grid grid-cols-2  grid-flow-row justify-center m-5 lg:max-w-screen lg:max-h-full"
    >
      <div className='grid auto-rows-min grid-flow-col col-span-1 grid-rows-5 pl-2'>
        
            <div className="row-span-1 text-primary text-2xl flex flex-row gap-x-3 items-center">
             <FaLanguage  className='justify-self-center text-6xl'/> 
              Streamify
            </div>

            <div className="row-span-1 grid grid-auto-flow-col ">
        <p className='text-xl'>
          Welcome Back
        </p>
        <p>
          Log back in  and continue your language learning journey 
        </p>
        </div>

         <div className="row-span-1 grid grid-auto-flow-col"
         >
            <label className='pb-0.5'>Email</label>
          <textarea placeholder="Your Email" 
          value={loginData.email}
        
          onChange={(e)=>setLoginData({...loginData,email:e.target.value})}className='textarea  justify-items-center rounded-lg  border-1 border-primary
           focus:border-blue-800  w-70 h-5' ></textarea>
         </div>

          <div className="row-span-1 grid grid-auto-flow-col pb-1">
              <label className='pb-0.5'>Password</label>
          <textarea placeholder="Password" 
          value={loginData.password}
        
          onChange={(e)=>setLoginData({...loginData,password:e.target.value})}className='textarea  justify-items-center rounded-lg  border-1 border-primary
           focus:border-blue-800  w-70 h-5 pr-9'
          ></textarea>
          </div>

          <div className='row-span-1 justify-items-center'>
             <button className='bg-secondary/50  rounded-lg border w-40 justify-self-center pb-2 place-self-center' type="submit" onClick={handleLogin}
              >Log In</button>
            
            {isPending===true &&
             <span className="loading loading-spinner text-primary justify-self-center"/>

             }
              <p  className='justify-self-center'>
               Don't have an account ? 
                <a href='/signup' className='text-info '> Sign Up</a>
              </p>
          </div>

      </div>
      <div className='col-span-1 grid   grid-cols-5 grid-rows-3 grid-flow-col border bg-primary/25 gap-y-0  rounded-lg auto-rows-fr '>
   
        <img src='./webcall_image.jpg' alt="webcall image"  className="row-span-2 col-span-3 col-start-2  pt-4 object-scale-down justify-self-center 
      
         w-full  h-auto"/>
    
      <div className='row-span-1 col-span-4 col-start-2 pr-2'>
      <p className='text-xl pb-2'> Connect with language partners worldwide</p>
  
       <p> Practise conversations , make friends and improve your language skills together </p>
      </div>
      </div>

    </div>
  )
}

export default LoginPage