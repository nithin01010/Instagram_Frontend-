import React, { useState, useEffect } from "react";
import { getdetails } from "../apis/functions";

const Details = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getdetails().then((result) => {
      console.log(result);
      setData(result);
    });
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-bold">{data.username}</h1>
      <p className="text-gray-400">{data.bio}</p>
    </div>
  );
};

export default Details;
