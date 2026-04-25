import React, { useCallback, useEffect, useRef, useState } from "react";
import type { PostTy } from "../../../types/Post";
import feedPost from "../api/feedPosts";
import getProfilePic from "../api/getProfilePic";

const ProfileAvatar = ({ userId }: { userId: string }) => {
  const [pic, setPic] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //     let isMounted = true;
  //     const fetchPic = async () => {
  //         try {
  //             const url = await getProfilePic(userId);
  //             if (isMounted && url) {
  //                 setPic(typeof url === 'string' ? url : url.profile_pic);
  //             }
  //         } catch (e) { console.error(e); }
  //     };
  //     fetchPic();
  //     return () => { isMounted = false };
  // }, [userId]);

  return (
    <img
      src={pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`}
      alt="profile"
      className="w-full h-full object-cover"
    />
  );
};

const FeedPosts = () => {
  const [posts, setPosts] = useState<PostTy[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [limit] = useState(12);
  const [skip, setSkip] = useState(0);

  const loadPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setLoading(true);
    const data = await feedPost(limit, skip);
    if (data) {
      setSkip((prev) => prev + limit);
      if (data.length < limit) setHasMore(false);
      setPosts((prev) => {
        const newPosts = data.filter(
          (newPost: PostTy) => !prev.some((p) => p.id === newPost.id),
        );
        return [...prev, ...newPosts];
      });
    }
    setLoading(false);
  }, [skip, limit, isLoading, hasMore]);

  // Initial load when component mounts
  useEffect(() => {
    if (posts.length === 0) {
      loadPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadPosts();
          }
        },
        {
          // A small threshold helps make the snapping feel smoother before loading the next
          threshold: 0.1,
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, loadPosts],
  );

  const handleLike = () => {
    console.log("Dummy Like Clicked");
  };

  const handleComment = () => {
    console.log("Dummy Comment Clicked");
  };

  return (
    // Container that snaps to child elements vertically
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory flex flex-col items-center pb-[60px] md:pb-0">
      {posts.map((post, index) => {
        const isLast = index === posts.length - 1;
        console.log(post);
        return (
          <div
            key={post.id}
            ref={isLast ? lastElementRef : null}
            className="h-screen w-full max-w-[450px] snap-always snap-start shrink-0 relative bg-black flex items-center justify-center border-b border-gray-800"
          >
            {/* Header: User Profile Pic & Username */}
            <div className="absolute top-0 left-0 w-full p-4 flex items-center gap-3 z-10 bg-gradient-to-b from-black/80 to-transparent">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                <img
                  src={
                    post.user?.profile_pic_url ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user?.id ?? post.id}`
                  }
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-semibold text-sm tracking-wide">
                <button >{post.user?.username || "Instagram User"}</button>
              </span>
            </div>

            {/* Image */}
            <img
              src={post.media_url}
              alt={post.caption || "Post content"}
              className="w-full max-h-full object-contain"
            />

            {/* Footer: Actions and Caption */}
            <div className="absolute bottom-0 left-0 w-full p-4 pb-6 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-3">
              {/* Action Icons */}
              <div className="flex items-center gap-4 text-white">
                <button
                  onClick={handleLike}
                  className="hover:text-gray-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleComment}
                  className="hover:text-gray-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                    />
                  </svg>
                </button>
              </div>

              {/* Likes count */}
              <div className="font-semibold text-white text-sm">
                {post.likes_count || 0} likes
              </div>

              {/* Caption */}
              <div className="text-white text-sm">
                <span className="font-semibold mr-2">
                  {post.user.username || "User"}
                </span>
                <span>{post.caption}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Loading Indicator for Infinite Scroll */}
      {isLoading && (
        <div className="h-20 w-full flex items-center justify-center snap-start shrink-0">
          <span className="text-white text-sm">Loading more posts...</span>
        </div>
      )}

      {/* Sentinel element to trigger load if there are no posts yet */}
      {!isLoading && posts.length === 0 && (
        <div
          ref={lastElementRef}
          className="h-10 w-full flex items-center justify-center text-white text-sm"
        >
          {hasMore ? "Loading feed..." : "No posts found."}
        </div>
      )}
    </div>
  );
};

export default FeedPosts;
