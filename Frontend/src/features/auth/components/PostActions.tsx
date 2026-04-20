import React, { useState, useRef, useEffect } from "react";
import { deletePost } from "../api/deletePost";
import updatePost from "../api/updatePost";

interface PostActionsProps {
  postId?: string;
  caption?: string;
}

const PostActions: React.FC<PostActionsProps> = ({ postId, caption }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newCaption, setNewCaption] = useState(caption);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    deletePost(postId);
    setOpen(false);
  };

  const handleUpdate = () => {
    setOpen(false);
    setShowModal(true);
  };

  const handleSubmitUpdate = () => {
    if (postId && newCaption.trim()) {
      updatePost(postId, newCaption);
    }
    setShowModal(false);
    setNewCaption("");
  };

  return (
    <>
      <div className="absolute top-2 right-2" ref={menuRef}>
        {/* 3-dot trigger */}
        <button
          className="text-gray-500 hover:text-gray-800 transition text-xl px-2 py-1 rounded-full hover:bg-gray-100"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Post actions"
        >
          ⋮
        </button>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Update Caption Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
          onClick={() => {
            setShowModal(false);
            setNewCaption("");
          }}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Update Caption
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                onClick={() => {
                  setShowModal(false);
                  setNewCaption("");
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-5 py-4">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                rows={4}
                placeholder="Write a new caption..."
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                autoFocus
              />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-5 py-3 border-t border-gray-100 bg-gray-50">
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-200 transition"
                onClick={() => {
                  setShowModal(false);
                  setNewCaption("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmitUpdate}
                disabled={!newCaption.trim()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostActions;
