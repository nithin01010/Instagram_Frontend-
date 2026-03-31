import React from "react";
import Picture from "../components/picture";
import Details from "../components/details";
import { check_token, getdetails } from "../apis/functions";
const profile = () => {
  check_token();
  return (
    <div className="flex flex-col max-w-4xl mx-auto p-4 gap-6">
      <div className="flex flex-row gap-6 items-center">
        <Picture />
        <div className="flex flex-col gap-1">
          <Details />
        </div>
      </div>
    </div>
  );
};

export default profile;
