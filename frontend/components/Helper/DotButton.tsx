'use client';
import { Post, User } from '@/types';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Ellipsis } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useFollowUnfollow } from '../hooks/use-auth';
import axios from 'axios';
import { BASE_API_URL } from '@/server';
import { handleAuthRequest } from '../utils/apiRequest';
import { deletePost } from '@/store/postSlice';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import LoadingButton from './LoadingButton';

type Props = {
    post:Post | null;
    user:User | null;
};

const DotButton = ({ post, user }: Props) => {

    const handleFollowUnfollow = useFollowUnfollow();
    const [isLoading, setIsLoading] = useState(false);

    const isOwnPost = post?.user?._id === user?._id;
    const isFollowing = post?.user?._id ? user?.following.includes(post.user._id):false;

    const dispatch = useDispatch();

    const handleDeletePost = async () => {
        const deletePostReq = async() => await axios.delete(`${BASE_API_URL}/posts/delete-post/${post?._id}`,{withCredentials:true});

        const result = await handleAuthRequest(deletePostReq, setIsLoading);

        if(result?.data.status=="success"){
            if(post?._id){
                dispatch(deletePost(post._id));
                toast.success(result?.data.message);
                redirect("/");
            }
        }
    };

  return (
    <div>
        <Dialog>
            <DialogTrigger>
                <Ellipsis className="w-8 h-8 text-black"/>
            </DialogTrigger>
            <DialogContent className="bg-white  max-w-xs sm:max-w-md mx-4 rounded-2xl">
                <DialogTitle></DialogTitle>
                <div className="space-y-4 flex flex-col w-fit justify-center items-center mx-auto">
                    {!isOwnPost && (
                        <div>
                            <Button onClick={()=>{if(post?.user?._id) handleFollowUnfollow(post?.user._id)}} variant={isFollowing ? "destructive":"secondary"} className="bg-blue-700 text-white">
                                {isFollowing ? "unfollow":"follow"}
                            </Button>
                        </div>
                    )}
                    <Link href={`/profile/${post?.user?._id}`}>
                    <Button variant={"outline"} className="shadow-md">
                        About this account
                    </Button>
                    </Link>
                    {isOwnPost && (
                        <LoadingButton isLoading={isLoading}  variant={"destructive"} onClick={handleDeletePost} className="bg-red-600 text-white">
                            Delete
                        </LoadingButton>
                    )}
                    </div>
                    <DialogClose>
                        Cancel
                    </DialogClose>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default DotButton;