import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postDetails } from "../features/auth/api/postDetails";
import type { PostTy } from "../types/Post";
import PostMedia from "../features/auth/components/PostMedia";
import PostInfo from "../features/auth/components/PostInfo";
import PostActions from "../features/auth/components/PostActions";

interface isownerprop{
  isowner: boolean;
};


const ViewPost: React.FC<isownerprop> = ({isowner}) => {
  const { name } = useParams<{ name: string }>();
  const [postDetail, setPostDetail] = useState<PostTy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postDetails(name);
        setPostDetail(data);
      } catch (error) {
        console.error("Failed to fetch post", error);
      } finally {
        setLoading(false);
      }
    };
    if (name) {
      fetchPost();
    }
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">Loading...</div>
    );
  }

  if (!postDetail) {
    return (
      <div className="flex justify-center items-center h-48 text-red-500">
        Post not found
      </div>
    );
  }
  return (
    <div className="relative flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-sm h-auto max-w-4xl mx-auto my-6">
      {/* 3-dot menu at top-right of card */}
     {isowner && <PostActions postId={name} caption={postDetail.caption} />}

      {/* Left Side: Post Image */}
      <PostMedia
        mediaType={postDetail.media_type}
        mediaUrl={postDetail.media_url}
      />

      {/* Right Side: Caption and Details */}
      <div className="w-full md:w-2/5 flex flex-col p-4 bg-white">
        <PostInfo
          caption={postDetail.caption}
          createdAt={postDetail.created_at}
        />
      </div>
    </div>
  );
};

export default ViewPost;
