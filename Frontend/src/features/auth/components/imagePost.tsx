import React from "react";

interface ImagePostProps {
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImagePost: React.FC<ImagePostProps> = ({
  imagePreview,
  setImagePreview,
  setSelectedFile,
  handleImageChange,
}) => {
  return (
    <>
      {imagePreview ? (
        <div className="w-full mb-4 flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-full max-h-80 object-contain rounded-md"
          />
          <button
            type="button"
            onClick={() => {
              setImagePreview(null);
              setSelectedFile(null);
            }}
            className="mt-4 px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
          >
            Remove Image
          </button>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center w-full h-48 bg-gray-50 rounded-md mb-4 border border-gray-200">
            <svg
              className="w-12 h-12 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-gray-500 font-medium">No image selected</span>
            <span className="text-gray-400 text-sm mt-1">
              Upload a photo to share
            </span>
          </div>
          <div className="px-2">
            <label className="cursor-pointer w-full mt-2 inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500
              file:mr-4 file:py-2.5 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              file:cursor-pointer cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePost;
