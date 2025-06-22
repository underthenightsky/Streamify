import React from "react";
import { FaLanguage } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router";
export const  Navbar=()=>{
    <div className="grid  grid-cols-subgrid col-span-10 row-span-1 grid-flow-row justify-items-center items-center gap-x-1 ">
    
            <Link to="/" className='flex place-items-center gap-x-2 col-span-1'>
              <FaLanguage className=' text-6xl justify-self-end' />
              Streamify
            </Link>
    
            <div className="col-span-2 col-end-11 flex flex-row place-items-center
                   gap-3
                  right-0
                  justify-self-end pr-2
                   ">
              <Link to='/notifications'><IoIosNotifications /></Link>
              <Link to ="/"className=''>C</Link>
              <Link to ="/" className=''>A</Link>
              <Link to="/api/auth/logout"><IoIosLogOut /></Link>
            </div>
    
          </div>
}

