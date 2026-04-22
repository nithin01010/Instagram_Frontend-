import { useEffect, useState, useRef, useCallback } from "react";
import type { PostTy } from "../../../types/Post";
import { userPost } from "../api/userPosts";
import { useNavigate } from "react-router-dom";

const Posts = ({ id }: { id: string }) => {
  const [post, setPost] = useState<PostTy[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const navigate = useNavigate();

  // Ref for intersection observer sentinel
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initial load
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await userPost(id, 0, limit);
      if (data) {
        setPost(data);
        setSkip(limit);
        if (data.length < limit) setMore(false);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [id, limit]);

  // Function to load more posts
  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setLoading(true);
    const data = await userPost(id, skip, limit);
    
    if (data) {
      setSkip((prev) => prev + limit);
      if (data.length < limit) setMore(false);
      
      // Filter out duplicate posts just in case the backend returns overlapping items
      setPost((prev) => {
        const newPosts = data.filter(
          (newPost: PostTy) => !prev.some((p) => p.id === newPost.id)
        );
        return [...prev, ...newPosts];
      });
    }
    setLoading(false);
  }, [id, skip, limit, isLoading, hasMore]);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore, loadMorePosts]);

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
      
      {/* Invisible Observer Sentinel element mapping to lastElementRef */}
      {hasMore && (
        <div ref={lastElementRef} className="h-10 flex w-full items-center justify-center mt-4">
          {isLoading && <span className="text-gray-400 text-sm">Loading more posts...</span>}
        </div>
      )}
    </div>
  );
};

export default Posts;

