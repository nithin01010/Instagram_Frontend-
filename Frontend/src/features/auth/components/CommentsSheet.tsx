import React, { useEffect, useState } from "react";
import comments from "../api/comments";
import type { Comment } from "../../../types/Comments";

interface CommentsSheetProps {
  postId: string;
  onClose: () => void;
}

const CommentsSheet = ({ postId, onClose }: CommentsSheetProps) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await comments(postId);
      if (data) setCommentList(data);
      setLoading(false);
    };
    load();
  }, [postId]);

  const handlePost = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;
    // TODO: wire to POST API
    setCommentList((prev) => [...prev, { name: "You", comment: trimmed, likes: 0 }]);
    setNewComment("");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-1/2 z-50 flex flex-col"
        style={{
          height: "70vh",
          width: "min(100%, 450px)",
          transform: "translateX(-50%)",
          background: "linear-gradient(180deg,#1a1a1a 0%,#111 100%)",
          borderRadius: "20px 20px 0 0",
          animation: "slideUp 0.35s cubic-bezier(0.32,0.72,0,1) forwards",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-600" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 shrink-0 border-b border-gray-800">
          <span className="text-white font-semibold text-base tracking-wide">
            Comments
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Comment List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400 text-sm">Loading comments…</span>
            </div>
          ) : commentList.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-500 text-sm">No comments yet. Be the first!</span>
            </div>
          ) : (
            commentList.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0 text-white text-xs font-bold">
                  {c.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white text-sm font-semibold">{c.name}</span>
                  <span className="text-gray-300 text-sm">{c.comment}</span>
                  {c.likes > 0 && (
                    <span className="text-gray-500 text-xs">{c.likes} likes</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Bar */}
        <div className="shrink-0 border-t border-gray-800 px-4 py-3 flex items-center gap-3">
          <input
            type="text"
            placeholder="Add a comment…"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
            className="flex-1 bg-gray-800 text-white text-sm rounded-full px-4 py-2 outline-none placeholder-gray-500 focus:ring-1 focus:ring-purple-500 transition"
          />
          <button
            disabled={!newComment.trim()}
            onClick={handlePost}
            className="text-purple-400 font-semibold text-sm disabled:opacity-40 hover:text-purple-300 transition-colors"
          >
            Post
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(100%); }
          to   { transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default CommentsSheet;
