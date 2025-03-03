'use client';
import { BASE_API_URL } from '@/server';
import { RootState } from '@/store/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleAuthRequest } from '../utils/apiRequest';
import { addComment, likeOrDislike, setPost } from '@/store/postSlice';
import { Bookmark, HeartIcon, Loader, MessageCircle, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import DotButton from '../Helper/DotButton';
import Image from 'next/image';
import Comment from '../Helper/Comment';
import { toast } from 'sonner';
import { setAuthUser } from '@/store/authSlice';

const Feed = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) => state.posts.posts);

  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activePostId, setActivePostId] = useState<string | null>(null); 

  console.log("POST", posts)

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const result = await axios.get(`${BASE_API_URL}/posts/all`);
        dispatch(setPost(result?.data?.data?.posts));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getAllPost();
  }, [dispatch]);

  const handleLikeDislike = async (id: string) => {
    try {
      const result = await axios.post(`${BASE_API_URL}/posts/like-dislike/${id}`, {}, { withCredentials: true });
      if (result.data.status === "success") {
        if (user?._id) {
          dispatch(likeOrDislike({ postId: id, userId: user?._id }));
          toast(result?.data?.message);
        }
      }
    } catch (error) {
      console.error("Error in like/dislike:", error);
    }
  }

  const handleSaveUnsave = async (id: string) => {
    try {
      const result = await axios.post(`${BASE_API_URL}/posts/save-unsave-post/${id}`, {}, { withCredentials: true });
      if (result.data.status == 'success') {
        dispatch(setAuthUser(result?.data?.data?.user));
        toast.success(result?.data?.message);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  }

  const handleComment = async (id: string) => {
    if (!comment) return;
    try {
      const result = await axios.post(`${BASE_API_URL}/posts/comment/${id}`, { text: comment }, { withCredentials: true });
      if (result?.data.status == 'success') {
        dispatch(addComment({ postId: id, comment: result?.data.data.comment }));
        toast.success("Comment Posted");
        setComment("");
        setActivePostId(null); 
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleShare = async (postId: string) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this post!",
          url: postUrl,
        });
        toast.success("Shared successfully!");
      } else {
        await navigator.clipboard.writeText(postUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share");
      console.error("Error sharing post:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col ">
        <Loader className="animate-spin" />
      </div>
    )
  }

  if (posts.length < 1) {
    return <div className="text-3xl m-8 text-center capitalize font-bold">
      No post to show
    </div>
  }

  return (
    <div className="mt-20 w-[90%] md:w-[70%] lg:w-[60%] mx-auto space-y-8">
      {posts.map((post) => {
        return <div key={post._id} className="mt-8 p-4 border-2 border-gray-100 bg-blue-100 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-9 h-9">
                <AvatarImage src={post.user?.profilePicture} className="h-full w-full" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1>{post.user?.username}</h1>
            </div>
            <DotButton post={post} user={user} />
          </div>
          <div className="mt-2">
            <Image src={`${post.image?.url}`} alt="Post" width={400} height={400} className="w-full" />
          </div>
        </div>
      })}
    </div>
  )
}

export default Feed;

