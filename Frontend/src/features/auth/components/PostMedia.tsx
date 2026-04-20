import React from "react";

interface PostMediaProps {
  mediaType: string;
  mediaUrl: string;
}

const PostMedia: React.FC<PostMediaProps> = ({ mediaType, mediaUrl }) => {
  return (
    <div className="w-full md:w-3/5 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
      {mediaType.toLowerCase() === "image" ? (
        <img
          src={mediaUrl}
          alt="Post content"
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <div className="text-white">Unsupported Media Type</div>
      )}
    </div>
  );
};

export default PostMedia;
