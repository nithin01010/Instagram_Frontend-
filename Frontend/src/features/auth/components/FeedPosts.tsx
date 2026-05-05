import React, { useCallback, useEffect, useRef, useState } from "react";
import type { PostTy } from "../../../types/Post";
import feedPost from "../api/feedPosts";
import PostCard from "./PostCard";
import CommentsSheet from "./CommentsSheet";

const FeedPosts = () => {
  const [posts, setPosts] = useState<PostTy[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [limit] = useState(12);
  const [skip, setSkip] = useState(0);
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(null);

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

  // Initial load
  useEffect(() => {
    if (posts.length === 0) loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attach IntersectionObserver to last post card
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) loadPosts();
        },
        { threshold: 0.1 },
      );
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, loadPosts],
  );

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory flex flex-col items-center pb-[60px] md:pb-0">
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          isLast={index === posts.length - 1}
          lastElementRef={lastElementRef}
          onCommentClick={setOpenCommentPostId}
        />
      ))}

      {/* Infinite scroll loading indicator */}
      {isLoading && (
        <div className="h-20 w-full flex items-center justify-center snap-start shrink-0">
          <span className="text-white text-sm">Loading more posts...</span>
        </div>
      )}

      {/* Sentinel for empty feed */}
      {!isLoading && posts.length === 0 && (
        <div
          ref={lastElementRef}
          className="h-10 w-full flex items-center justify-center text-white text-sm"
        >
          {hasMore ? "Loading feed..." : "No posts found."}
        </div>
      )}

      {/* Comments bottom sheet */}
      {openCommentPostId && (
        <CommentsSheet
          postId={openCommentPostId}
          onClose={() => setOpenCommentPostId(null)}
        />
      )}
    </div>
  );
};

export default FeedPosts;
