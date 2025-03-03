'use client';
import { KeySquareIcon } from 'lucide-react';
import React, { useState } from 'react'
import LoadingButton from '../Helper/LoadingButton';
import axios from 'axios';
import { BASE_API_URL } from '@/server';
import { handleAuthRequest } from '../utils/apiRequest';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ForgetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleSubmit = async()=>{
        const forgetPassReq = async()=>await axios.post(`${BASE_API_URL}/users/forget-password`,{email},{withCredentials: true});
        const result = await handleAuthRequest(forgetPassReq,setIsLoading);
        if(result){
            router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
            toast.success(result.data.message);
        }
    }

  return (
    <div className="flex items-center justify-center flex-col w-full h-screen">
        <KeySquareIcon className="w-20 h-20 sm:w-32 sm:h-32 text-blue-700 mb-12"/>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Forget your Password?</h1>
        <p className="mb-6 text-sm sm:text-base text-center text-gray-600 font-medium">Enter your registered email</p>
        <input type="email" placeholder="Enter your email" className="px-6 py-3.5 rounded-lg outline-none bg-gray-200 block w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <LoadingButton onClick={handleSubmit} className="w-40 mt-4 bg-blue-600 text-white"size={"lg"} isLoading={isLoading}>continue</LoadingButton>
    </div>
  )
}

export default ForgetPassword;