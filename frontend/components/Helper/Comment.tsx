'use client';
import { Post, User } from '@/types';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import DotButton from './DotButton';
import axios from 'axios';
import { BASE_API_URL } from '@/server';
import { handleAuthRequest } from '../utils/apiRequest';
import { addComment } from '@/store/postSlice';
import { toast } from 'sonner';
import LoadingButton from './LoadingButton';

type Props = {
    user: User | null;
    post: Post | null;
};

const Comment = ({ post, user} : Props) => {
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const addCommentHandler = async(id:string) => {
      if (!comment) return;
      const addCommentReq = async () => await axios.post(`${BASE_API_URL}/posts/comment/${id}`, { text: comment }, { withCredentials: true });
  
      const result = await handleAuthRequest(addCommentReq, setIsLoading);
      if (result?.data.status == 'success') {
        dispatch(addComment({ postId: id, comment: result?.data.data.comment }));
        toast.success("Comment Posted");
        setComment("");
      }
    };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <p className="mt-2 text-sm font-semibold">View All {post?.comments.length} Comment</p>
        </DialogTrigger>
        <DialogContent className="max-w-5xl p-0 gap-0 flex flex-col bg-white min-h-[200px]">
          <DialogTitle></DialogTitle>
          <div className="flex flex-1">
            <div className="sm:w-1/2 hidden sm:block max-h-[80vh]">
              <Image src={`${post?.image?.url}`} alt="Post Image" width={300} height={300} className="w-full h-full object-cover rounded-l-lg"/>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col justify-between">
            <div className="flex items-center mt-4 justify-between p-4">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={post?.user?.profilePicture}/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{post?.user?.username}</p>
                </div>
              </div>
              <DotButton user={user} post={post}/>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              {post?.comments.map((item)=>{
                return <div key={item._id} className="flex mb-4 gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={item?.user?.profilePicture}/>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-bold">{item?.user?.username}</p>
                    <p className="font-normal text-sm">{item?.text}</p>
                  </div>
                </div>
              })}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add a comment" className="w-full outline-none border text-sm border-gray-100 p-2 rounded bg-blue-100"/>
                <LoadingButton isLoading={isLoading} onClick={() => { if (post?._id) addCommentHandler(post?._id);}} className="bg-blue-700 text-white">Send</LoadingButton>

              </div>
            </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Comment;