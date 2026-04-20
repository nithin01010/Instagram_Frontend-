import React from "react";

interface PostInfoProps {
  caption: string;
  createdAt: string;
}

const PostInfo: React.FC<PostInfoProps> = ({ caption, createdAt }) => {
  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
        <h3 className="font-semibold text-gray-800">Post details</h3>
        {/* <span className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span> */}
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="flex gap-2">
          <span className="font-bold text-sm">User</span>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{caption}</p>
        </div>
      </div>
    </>
  );
};

export default PostInfo;
