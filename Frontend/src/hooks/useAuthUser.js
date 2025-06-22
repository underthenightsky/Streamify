// these hooks are just normal functions we are using ,just bringing the react query part from one section to another 

import {useQuery} from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";
// here we are just making the call to check if we have to cookie with our userId 
function useAuthUser(){
    const authUser = useQuery({
        queryKey:['authUser'],
        queryFn:getAuthUser,
        retry:false
    });
    return {isLoading :authUser.isLoading,authUser:authUser.data?.user};

};
export default useAuthUser;