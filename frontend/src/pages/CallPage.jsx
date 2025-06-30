import React, { useEffect, useState } from 'react'
import { StreamCall, StreamCallProvider, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import useAuthUser from "../hooks/useAuthUser"
import {getStreamToken} from "../lib/api.js"
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import ChatLoader from '../components/ChatLoader.jsx';
function CallPage() {
  // use a useState to store the call 
  const [call,setCall]=useState();
  const {id}=useParams();
  // set a seperate const for getting the api key 
  const apiKey = import.meta.env.VITE_STREAM_API_KEY;

  // now we need the info of the user to create the session
  const {authUser} = useAuthUser();
  // now we need to generate a userToken to provide authentication for a particular user 
  const  {data : userToken,isLoading}= useQuery({
      queryKey:['getStreamToken'],
      queryFn: getStreamToken,
      enabled:!!authUser
    }) // only fetch when the user is authenticated
  //using the user's data and the authentication we have recieved from the backend to create the user object
  const client =new StreamVideoClient({
    apiKey,
    tokenOrProvide:userToken,
    userData:{id:authUser.id , name:authUser.fullName,image:authUser.profilePic}
  });
  // set a call id
  const callId = [authUser._id, id].sort().join("-");
  //to set a channel for communication and not set a channel if client is null
  useEffect( ()=>{
    if(!client){
      return 
    }
    else{
      //set channel 
    const call = client.call('default', callId);
call.join({
  create: true,
  data: {
    members: [
     { user_id: authUser._id }, { user_id: id } 
    ],
    custom: {
      title: 'Language',
      description: 'Learn by Helping Others',
    },
  },
});
setCall(call)
    }
  },) ;

    if (isLoading || !client || !call) return <ChatLoader />;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        {/** We will introduce the <MyUILayout /> component later */}
        {/** <MyUILayout /> */}
      </StreamCall>
    </StreamVideo>
  )
}

export default CallPage