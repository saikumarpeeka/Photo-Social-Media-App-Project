"use client";
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Passwordinput from './Passwordinput';
import LoadingButton from '../Helper/LoadingButton';
import Link from 'next/link';
import { BASE_API_URL } from '@/server';
import axios from 'axios';
import { handleAuthRequest } from '../utils/apiRequest';
import { toast } from 'sonner';
import { setAuthUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

interface FormData {
  email:string;
  password:string;
}

const Login = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email:'',
    password:'',
  });

  const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
    const {name,value} = e.target;
    setFormData((prev)=>({...prev,[name]:value}))
  };

  const handleSubmit = async(e:FormEvent)=>{
    e.preventDefault();
    const loginReq = async () => await axios.post(`${BASE_API_URL}/users/login`, formData,{withCredentials:true});

    const result = await handleAuthRequest(loginReq,setIsLoading);

    if(result){
      dispatch(setAuthUser(result?.data?.data?.user));
      toast.success(result?.data?.message);
      router.push("/")
    }

  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <div className="lg:col-span-4 min-h-screen hidden lg:block">
          <Image src="/images/Social_Banner.jpg" alt="Signup" width={1000} height={1000} className="w-full h-full object-cover"/>
        </div>
        <div className="lg:col-span-3 flex flex-col items-center justify-center h-screen">
          <h1 className="font-bold text-xl sm:text-2xl text-left uppercase mb-8">
            Login with <span className="text-blue-600">Gojira</span>
          </h1>
          <form onSubmit={handleSubmit} className="block w-[90%] sm:w-[80%] md:w-[60%] lg:w-[90%] xl:w-[80%]">
            <div className="mb-4 ">
              <label htmlFor="email" className="font-semibold mb-2 block">
                Email
              </label>
              <input type="email" name="email" placeholder="Email address" className="px-4 py-3 bg-blue-100 rounded-lg w-full block outline-blue-700" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Passwordinput label="Password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange}/>
              <Link href="/auth/forget-password" className="mt-2 text-blue-600 block font-semibold text-base cursor-pointer text-right">
                Forgot Password?
              </Link>
            </div>
            <LoadingButton size={"lg"} className="w-full mt-3 bg-blue-600 text-white" type="submit" isLoading={isLoading}>Login Now</LoadingButton>
          </form>
          <h1 className="mt-4 text-lg text-gray-800">
            Don&apos;t have an account ?{" "}
            <Link href="/auth/signup">
              <span className="text-blue-800 cursor-pointer font-medium">
                Signup
              </span>{" "}
            </Link>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Login;