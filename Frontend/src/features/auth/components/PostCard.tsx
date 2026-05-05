import React from "react";
import type { PostTy } from "../../../types/Post";
import likecount from "../api/likeIncrase";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: PostTy;
  isLast: boolean;
  lastElementRef: (node: HTMLDivElement | null) => void;
  onCommentClick: (postId: string) => void;
}

const PostCard = ({ post, isLast, lastElementRef, onCommentClick }: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      ref={isLast ? lastElementRef : null}
      className="h-screen w-full max-w-[450px] snap-always snap-start shrink-0 relative bg-black flex items-center justify-center border-b border-gray-800"
    >
      {/* Header: Avatar + Username */}
      <div className="absolute top-0 left-0 w-full p-4 flex items-center gap-3 z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div
          className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 cursor-pointer"
          onClick={() => navigate(`/user/${post.user.username}`)}
        >
          <img
            src={
              post.user?.profile_pic_url ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user?.id ?? post.id}`
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          className="text-white font-semibold text-sm tracking-wide hover:underline"
          onClick={() => navigate(`/user/${post.user.username}`)}
        >
          {post.user?.username || "Instagram User"}
        </button>
      </div>

      {/* Post Image */}
      <img
        src={post.media_url}
        alt={post.caption || "Post content"}
        className="w-full max-h-full object-contain"
      />

      {/* Footer: Actions + Likes + Caption */}
      <div className="absolute bottom-0 left-0 w-full p-4 pb-6 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-3">
        {/* Action Buttons */}
        <div className="flex items-center gap-4 text-white">
          {/* Like */}
          <button
            onClick={() => likecount(post.id)}
            className="hover:text-pink-400 transition-colors"
            aria-label="Like post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>

          {/* Comment */}
          <button
            onClick={() => onCommentClick(post.id)}
            className="hover:text-purple-400 transition-colors"
            aria-label="View comments"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
          </button>
        </div>

        {/* Likes Count */}
        <div className="font-semibold text-white text-sm">
          {post.likes_count || 0} likes
        </div>

        {/* Caption */}
        <div className="text-white text-sm">
          <span className="font-semibold mr-2">{post.user.username || "User"}</span>
          <span>{post.caption}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
