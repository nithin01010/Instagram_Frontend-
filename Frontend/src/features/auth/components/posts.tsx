import { useEffect, useState } from "react";
import type { PostTy } from "../../../types/Post";
import { userPost } from "../api/userPosts";
import { useNavigate } from "react-router-dom";

const Posts = ({ id }: { id: string }) => {
  const [post, setPost] = useState<PostTy[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fectPosts = async () => {
      const data = await userPost(id);
      setPost(data);
    };
    fectPosts();
  }, [id]);
  return (
    <div className="w-full">
      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-2"></div>

      {/* Section label */}
      <div className="flex justify-center gap-8 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
        <span className="border-t-2 border-black dark:border-white pt-3 text-black dark:text-white -mt-[13px]">
          Posts
        </span>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-3 gap-1">
        {post.map((epost) => (
          <img
            key={epost.id}
            src={epost.media_url}
            onClick={() => navigate(`/view-post/${epost.id}`)}
            alt="Instagram post"
            className="aspect-square object-cover w-full h-full hover:opacity-90 transition-opacity cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};
export default Posts;