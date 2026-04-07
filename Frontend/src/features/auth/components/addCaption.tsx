import React from "react";

interface AddCaptionProps {
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
}

const AddCaption: React.FC<AddCaptionProps> = ({ caption, setCaption }) => {
  return (
    <div className="w-full mt-6">
      <input
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 shadow-inner"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write a caption..."
      />
    </div>
  );
};

export default AddCaption;
