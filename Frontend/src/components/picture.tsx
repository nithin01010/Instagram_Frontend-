import React from "react";
import { getdetails } from "../apis/functions";

const picture = () => {
  //   const data = getdetails();
  return (
    <img
      src="https://placehold.co/400x400"
      className="w-32 h-32 rounded-full object-cover"
    />
  );
};

export default picture;
