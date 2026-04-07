import React, { useState } from "react";
import Button from "../components/button";
import { createPost } from "../features/auth/api/createPost";
import type { PostInputTy } from "../types/PostInput";
import ImagePost from "../features/auth/components/imagePost";
import AddCaption from "../features/auth/components/addCaption";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<PostInputTy | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a local URL for the selected image to show as a preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>

      <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center text-center">
        <ImagePost
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          setSelectedFile={setSelectedFile}
          handleImageChange={handleImageChange}
        />
        <AddCaption caption={caption} setCaption={setCaption} />
        <div className="py-6 w-full max-w-xs">
          <Button
            text={isSubmitting ? "Creating..." : "Create Post"}
            onClick={async () => {
              if (selectedFile) {
                setIsSubmitting(true);
                try {
                  alert("Post created successfully!");
                  navigate("/profile");
                } catch (error) {
                  alert("Oops! Failed to create post.");
                  setIsSubmitting(false);
                }
              } else {
                alert("Please select an image first!");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
