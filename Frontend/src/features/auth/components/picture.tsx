import React from "react";
import { getdetails } from "../api/functions";

interface data {
  url?: string;
  // id?:string
}

const picture = ({ url }: data) => {
  return <img src={url} className="w-32 h-32 rounded-full object-cover" />;
};

export default picture;
