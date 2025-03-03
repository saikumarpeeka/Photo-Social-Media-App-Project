import { BASE_API_URL } from "@/server";
import axios from "axios";
import { useDispatch } from "react-redux"
import { handleAuthRequest } from "../utils/apiRequest";
import { setAuthUser } from "@/store/authSlice";
import { toast } from "sonner";
import { useState } from "react";


export const useFollowUnfollow = () => {
    const dispatch = useDispatch();
     const [isLoading,setIsLoading] = useState(false);

    const handleFollowUnfollow = async(userId:string)=>{
        const followUnfollowReq = async() => await axios.post(`${BASE_API_URL}/users/follow-unfollow/${userId}`,{},{withCredentials:true});

        const result = await handleAuthRequest(followUnfollowReq, setIsLoading);
        if(result?.data.status=="success")
        dispatch(setAuthUser(result?.data.data.user));
        toast.success(result?.data.message);
    };
    return(handleFollowUnfollow)
}
