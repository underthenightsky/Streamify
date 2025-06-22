import React from 'react'
import {Navbar} from '../components/Navbar.tsx'
import { FaLanguage } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import useAuthUser from '../hooks/useAuthUser.js';
import { IoIosColorPalette } from "react-icons/io";

function HomePage() {
  const {authUser} = useAuthUser();
  return (
    <div className='grid grid-rows-10 grid-cols-10 grid-flow-col auto-cols-min' >
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
                        text-primary/75">
                   <Link to='/notifications'><IoIosNotifications size={28} /></Link>
                   <Link to ="/" ><IoIosColorPalette size={24} /></Link>
                   <Link to ="/" className=''>
                   <img src={authUser.profilePic} 
                   className="rounded-full  w-[32px]" alt="P"/>
                   </Link>
                   <Link to="/api/auth/logout"><IoIosLogOut size={30} /></Link>
                 </div>
         
               </div>
      {/* SideBar */}
      <div className="row-span-full col-span-1 grid grid-rows-subgrid row-start-2 justify-self-start pl-2 text-primary/75">

        <Link to="/" className='flex place-items-center gap-1'> <FaHome /><span>Home</span></Link>
        <Link to='/notifications' className='flex place-items-center gap-1'><IoIosNotifications /><span>Notification</span></Link>
        <Link to="/call" className='flex place-items-center gap-1'><FaUserFriends /><span>Friends</span></Link>
      </div>


    </div>
  )
}

export default HomePage