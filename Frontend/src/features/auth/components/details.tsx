import React, { useState, useEffect } from "react";
import { getdetails } from "../api/functions";
// import { Interface } from "readline";

interface Data {
  name: string;
  bio: string;
}

const Details = ({ name, bio }: Data) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="text-gray-400">6 posts 128 followers 176 following</p>
      <p className="text-gray-400">Do Dsa everyday if you want job</p>
    </div>
  );
};

export default Details;
