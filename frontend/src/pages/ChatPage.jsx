import React, { useEffect, useState } from 'react'
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import useAuthUser from "../hooks/useAuthUser"
import {getStreamToken} from "../lib/api.js"
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import toast from "react-hot-toast";
import CallButton from "../components/CallButton"
import ChatLoader from "../components/ChatLoader.jsx"

function ChatPage() {
  let {id}=useParams();
  // set a seperate const for getting the api key 
  const apiKey = import.meta.env.VITE_STREAM_API_KEY;
  // create a channel for communication 
  const [channel,setChannel]=useState();
  // now we need the info of the user to create the session
  const {authUser} = useAuthUser();
  // now we need to generate a userToken to provide authentication for a particular user 
  //mistake i was making here was that the response had thhe result as data but i was searching for a different variable , we need to extract the variable with that name and then set it to the name we want  
  const {data : userToken,isLoading}= useQuery({
    queryKey:['getStreamToken'],
    queryFn: getStreamToken,
    enabled:!!authUser
  }) // only fetch when the user is authenticated

  // wait till isLoading is false 

  //using the user's data and the authentication we have recieved from the backend to create the user object
  const client =useCreateChatClient({
    apiKey,
    tokenOrProvider:userToken,
    userData:{id:authUser._id , name:authUser.fullName,image:authUser.profilePic}
  });
  //to set a channel for communication and not set a channel if client is null
  useEffect(()=>{
    if(!client){
      return 
    }
    else{
      //set channel 
      // creating a custom channel Id that can be accessed later from both sides
       const channelId = [authUser._id, id].sort().join("-");
      const channel = client.channel("messaging",channelId,{      
       
        members:[authUser._id,id]
      });
      setChannel(channel);
    }
  },[client,authUser._id,id]) ;
  // call function 
  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

    if (isLoading || !client || !channel) return <ChatLoader />;

  return (
    <div className="min-h-full ">
    <Chat client={client}>     
      <Channel channel={channel}>
         <div className='w-full relative min-h-full'>
          <CallButton handleVideoCall={handleVideoCall} />
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        </div>
        <Thread />
      </Channel>
    </Chat>
    </div>
  )
}

export default ChatPage