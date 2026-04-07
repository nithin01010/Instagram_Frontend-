import React, { useEffect, useState } from "react";
import { postDetails } from "../features/auth/api/postDetails";
import type { PostTy } from "../types/Post";
import { deletePost } from "../features/auth/api/deletePost";

interface ViewPostProps {
  id: string;
}

const ViewPost: React.FC<ViewPostProps> = ({ id }) => {
  // Added type PostTy here for clarity and safety, initialized to null while loading
  const [postDetail, setPostDetail] = useState<PostTy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We cannot call an async network fetch directly in the component body,
    // so we use a React useEffect hook to handle the API call.
    const fetchPost = async () => {
      try {
        const data = await postDetails(id);
        setPostDetail(data);
      } catch (error) {
        console.error("Failed to fetch post", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

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
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-auto max-w-4xl mx-auto my-6">
      {/* Left Side: Post Image */}
      <div className="w-full md:w-3/5 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
        {postDetail.media_type.toLowerCase() === "image" ? (
          <img
            src={postDetail.media_url}
            alt="Post content"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-white">Unsupported Media Type</div>
        )}
      </div>

      {/* Right Side: Caption and Details */}
      <div className="w-full md:w-2/5 flex flex-col p-4 bg-white">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
          <h3 className="font-semibold text-gray-800">Post details</h3>
          <span className="text-xs text-gray-500">
            {new Date(postDetail.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="flex gap-2">
            <span className="font-bold text-sm">User</span>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {postDetail.caption}
            </p>
          </div>
        </div>

        {/* Delete Button (UI Only, OnClick Left Empty) */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
          <button
            className="text-red-500 text-sm font-semibold hover:text-red-700 transition"
            onClick={() => {
              deletePost(id);
            }}
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
