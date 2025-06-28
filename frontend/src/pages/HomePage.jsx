import React, { useState,useEffect } from 'react'
import { Navigate } from 'react-router';
import {Navbar} from '../components/Navbar.tsx'
import { FaLanguage } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import useAuthUser from '../hooks/useAuthUser.js';
import { IoIosColorPalette } from "react-icons/io";
import { LuMessageSquareDiff } from "react-icons/lu";
import {useMutation, useQuery ,useQueryClient} from "@tanstack/react-query"
import { getUserFriends,getRecommendedUsers,getOutgoingFriendReqs,sendFriendRequest } from '../lib/api.js';
// import FriendCard, { getLanguageFlag } from "../components/FriendCard.jsx";
// import NoFriendsFound from "../components/NoFriendsFound.jsx";
import toast from 'react-hot-toast';

function HomePage() {
  const {authUser} = useAuthUser();
  const queryClient =useQueryClient();
  // we use a set to show only unique ids
  const [outgoingRequestIds,setOutgoingRequestIds] =useState(new Set());
// get list of current friends of the user ,set default value of friends array
  const {data:friends=[],isLoading:loadingFriends}=useQuery({
    queryKey:["friends"],
    queryFn:getUserFriends
  });
// get list of possible friends
  const {data: recommendedUsers =[],isLoading:loadingRecommended}=useQuery({
    queryKey:["users"],
    queryFn:getRecommendedUsers,
  });
  console.log(recommendedUsers);
  // get list of friend request we have sent that are unanswered
  const {data: outgoingFriendReqs}=useQuery({
    queryKey:['outgoingFriendReqs'],
    queryFn:getOutgoingFriendReqs
  });
  // now we needd to create these functions in api.js and import them here
  // now after importing the functions the home page has the functionality of sending friend reqs to recommended users we do this by creating a mutation 
  const {mutate:sendRequestMutation,isPending}=useMutation({
    mutationFn:sendFriendRequest ,
    onSuccess:()=>{
       toast("Success",{
                    style:{
                      background:"green"
                    }
                  });
      queryClient.invalidateQueries({queryKey:['outgoingFriendReqs']})

    },
     onError:(error)=>{
            toast(`Error ${error}`,{
                      style:{
                        background:"red"
                      }
                    })
        }
  });
  async function onFriendRequest(recipientId){
    // function to pass the the data to the mutation function 
    const res= await sendRequestMutation(recipientId);
    console.log(res)
    }
  
  // see the thing is that we need the userIDs of the people to whom we have sent friend requests to show their profile so we need to iterate through the userIds of the outgoingFriendReqs array and add the userIds to the set of outgoing reqs
  // also the thing is that as soon as we send a new friend request we are invalidating the outGoingFriendReqs query to allow us to refetch that data each that time the query get's refetched we need to update the set of users to whom we have sent outgoing friends reqs so to do that we use o useEffect to re-render the page once we send a friend request
 useEffect(()=>{
  const outgoingIds= new Set();
  if(outgoingFriendReqs && outgoingFriendReqs > 0){
    outgoingFriendReqs.forEach((req)=>{outgoingIds.add(req.recipientId._id);
  })
    // update the state
    setOutgoingRequestIds(outgoingIds);
  
  }
 },[outgoingFriendReqs]);

//  now what we have these varaibles we need to display them 

  return (
    <div className='grid grid-rows-12 grid-cols-10 grid-flow-col auto-cols-min min-h-[100%] auto-rows-auto' >
      {/* Navbar */}
     <div className="grid  grid-cols-subgrid col-span-10 row-span-1 grid-flow-row justify-items-center items-center gap-x-1 ">

         <span className='col-span-3
               justify-items-end lg:col-span-1 justify-self-start'>
                 <Link to="/" className='flex  gap-x-2  pl-2 items-center text-primary/75'>
                   <FaLanguage className=' text-6xl justify-self-end' />
                   Streamify
                 </Link>
         </span>

                 <div className="col-span-2 col-end-11 flex flex-row place-items-center
                        gap-3
                       right-0
                       justify-self-end pr-2
                        text-primary/75
                        grid-cols-subgrid
                        grid-rows-subgrid">
                   <Link to='/notifications'><IoIosNotifications size={28} /></Link>
                   <Link to ="/" ><IoIosColorPalette size={24} /></Link>
                   <Link to ="/" className=''>
                   <img src={authUser.profilePic} 
                   className="rounded-full  w-[32px] min-w-[15px]" alt="P"/>
                   </Link>
                   <Link to="/api/auth/logout"><IoIosLogOut size={30} /></Link>
                 </div>
         
               </div>
      {/* SideBar */}
      <div className="row-span-full col-span-1 grid grid-rows-subgrid grid-cols-subgrid row-start-2 justify-self-start pl-2 text-primary/75">

        <Link to="/" className='flex place-items-center gap-1'> <FaHome /><span>Home</span></Link>
        <Link to='/notifications' className='flex place-items-center gap-1'><IoIosNotifications /><span>Notification</span></Link>
        <Link to="/call" className='flex place-items-center gap-1'><FaUserFriends /><span>Friends</span></Link>
      </div>
    {/* Now for the main portion of the home page where we show the user with their friends and then other people who they can be friends with  */}

    <div className='row-span-full col-span-9 grid grid-rows-subgrid grid-cols-subgrid row-start-2  pl-2 grid-flow-col bg-base-200 ml-8 rounded-xl'>
    {/* your friends and friends request section  */}
    <div className='grid grid-rows-subgrid grid-cols-subgrid row-span-1 col-span-9 items-center'>
      {/* i was right about the main axis direction  */}
      <div className='col-span-3 md:cols-span-2 lg:col-span-1  md:text-lg ' >
       Your Friends
      </div>

      <Link  className='cols-span-2 col-end-11 justify-self-end flex justify-items-end border-3 border-solid  border-blue-400 pr-2 bg-neutral rounded-sm ' to="/notifications" >
      
         <LuMessageSquareDiff size={30}  className='bg-neutral rounded-sm pl-1'/>
        <span >Requests</span>
      
       
      </Link>
      
    </div>

      <div className='grid grid-rows-subgrid grid-cols-subgrid row-span-3 col-span-9 '>
      {loadingFriends ? (
          
            <span className="loading loading-spinner loading-lg place-self-center row-span-1 col-span-full" />
          
        ) : friends.length === 0 ? (
            <div className="grid grid-cols-subgrid grid-rows-subgrid col-span-9  p-6 justify-items-center  row-span-2  ml-4">
      <h3 className="text-2xl sm:text-3xl row-span-1 col-span-9 font-bold self-start tracking-tight">No friends yet</h3>
      <p className="opacity-70 row-span-1 col-span-9 row-start-7 self-end">
        Connect with language partners below to start practicing together!
      </p>
    </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
             <div key={friend._id} className='col-span-3 lg:col-span-1 row-span-3  grid  grid-cols-subgrid grid-rows-subgrid  bg-neutral px-2 rounded-md justify-items-center pb-1 pt-1'>
                    
                      <img src={friend.profilePic} alt={friend.fullName} className='size-20 rounded-full row-span-1 col-span-3  lg:col-span-1 place-self-center ' />
                      
                      <div className='row-span-1 col-span-3 lg:col-span-1 row-start-11 justify-items-center'>
                      <p className=' '>{friend.fullName}</p>
                       <p>Learning Language : {friend.learningLanguage}</p> 
                       <p> Native Language : {friend.nativeLanguage} </p>
                      </div>

                      <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
                   
                </div>
            ))}
          </div>
        )}

      </div>
{/* recommened users header */}
      <div className='grid grid-rows-subgrid grid-cols-subgrid row-span-1 col-span-9 items-center'>
        <h2 className="text-2xl sm:text-3xl row-span-1 col-span-9 font-bold self-start tracking-tight">Meet New Learners</h2>
                <p className="opacity-70 row-span-1 col-span-9 row-start-7">
                  Discover perfect language exchange partners based on your profile
                </p>
      </div>
      {/* recommended users content */}
        <div className='grid grid-rows-subgrid grid-cols-subgrid row-span-5  col-span-9  grid-flow-col row-start-6'>
        {
          loadingRecommended?(
            <div className="grid grid-rows-subgrid grid-cols-subgrid ">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ):
          recommendedUsers.length === 0 ? (
            <div className="grid grid-rows-subgrid grid-cols-subgridpy-12 text-center col-span-9 row-span-1">
              <h3 className="font-semibold text-lg mb-2 self-start">No recommendations available</h3>
              <p className="text-base-content opacity-70 self-end">
                Check back later for new language partners!
              </p>
            </div>
          )
          :(<ul className='grid grid-cols-subgrid grid-rows-subgrid col-span-9 row-span-auto gap-1 row-span-5 '>
            {recommendedUsers.map((user)=>{

              return(
                <div key={user._id} className='col-span-3 lg:col-span-1 row-span-3  grid  grid-cols-subgrid grid-rows-subgrid  bg-neutral px-2 rounded-md justify-items-center pb-1 pt-1'>
                    
                      <img src={user.profilePic} alt={user.fullName} className='size-20 rounded-full row-span-1 col-span-3  lg:col-span-1 place-self-center ' />
                      
                      <div className='row-span-1 col-span-3 lg:col-span-1 row-start-11 justify-items-center'>
                      <p className=' '>{user.fullName}</p>
                       <p>Learning Language : {user.learningLanguage}</p> 
                       <p> Native Language : {user.nativeLanguage} </p>
                      </div>

                      <button className='bg-primary/50 rounded-md pr-1 pl-1 col-span-3 lg;col-span-1 place-self-center' onClick={()=>{onFriendRequest(user._id)}}> Friend Request </button>
                   
                </div>
              )
            })}
            </ul>
          )}
        
        </div>
    </div>

    </div>
  )
}

export default HomePage