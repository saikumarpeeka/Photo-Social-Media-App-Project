'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import Passwordinput from './Passwordinput';
import LoadingButton from '../Helper/LoadingButton';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_API_URL } from '@/server';
import { handleAuthRequest } from '../utils/apiRequest';
import { setAuthUser } from '@/store/authSlice';
import { toast } from 'sonner';

const PasswordReset = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async()=>{
    if(!otp || !password || !passwordConfirm){
      return;
    }
    const data={email,otp,password,passwordConfirm};

    const resetPassreq = async()=>await axios.post(`${BASE_API_URL}/users/reset-password`,data,{withCredentials:true});
    const result = await handleAuthRequest(resetPassreq,setIsLoading);

    if(result){
      dispatch(setAuthUser(result.data.data.user));
      toast.success(result.data.message);
      router.push("/auth/login");
    }
    
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-700">Reset your password</h1>
      <p className="mb-6 text-sm sm:text-base text-center text-gray-600 font-medium">Enter your OTP and new password to reset your password</p>
      <input type="number" placeholder="Enter OTP" className="block w-[90%] sm:[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto px-6 py-3 bg-blue-100 rounded-lg no-spinner outline-blue-700" value={otp} onChange={(e)=>setOtp(e.target.value)}/>
      <div className="mb-4 mt-4 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] ">
        <Passwordinput name="password" placeholder="Enter new password" inputClassName="px-6 py-3 bg-blue-100 rounded-lg outline-blue-900" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] ">
        <Passwordinput name="passwordConfirm" placeholder="Confirm your password" inputClassName="px-6 py-3 bg-blue-100 rounded-lg outline-blue-900" value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)}/>
      </div>
      <div className="flex items-center space-x-4 mt-6">
        <LoadingButton onClick={handleSubmit} isLoading={isLoading} className="bg-blue-700 text-white">Change Password</LoadingButton>
        <Button variant={"ghost"} className="text-blue-700">
          <Link href="/auth/forget-password">
            Go Back
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default PasswordReset;