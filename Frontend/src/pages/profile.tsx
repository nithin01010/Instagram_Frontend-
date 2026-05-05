import React, { useEffect, useState } from "react";
import Picture from "../features/auth/components/picture";
import Details from "../features/auth/components/details";
import Posts from "../features/auth/components/posts";
import {
  createPost,
  getdetails,
  useRedirectIfLoggedIn,
  useRequireAuth,
} from "../features/auth/api/functions";
import type { UserDetailsTy } from "../types/UserDetails";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/api/logOut";

interface owner {
  isowner: boolean;
  udata?: UserDetailsTy;
}

const Profile = ({ isowner = true, udata }: owner) => {
  // const check = useRedirectIfLoggedIn();
  const authenticated = useRequireAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<UserDetailsTy | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = isowner ? await getdetails() : udata;
      console.log("Fetched user data:", result);
      if (result) setData(result);
    };
    fetchData();
  }, []);
  // const
  // con
  if (!authenticated) return null;

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-4 gap-6">
      <div className="flex justify-end">
        {isowner && <Button text="logout" onClick={() => logout(navigate)} />}
      </div>
      <div className="flex flex-row gap-6  justify-center items-center  items-center">
        {/* <Picture url={data.profile_pic_url} /> */}
        <Picture url={data?.profile_pic_url} />
        <div className="flex flex-col gap-1">
          {/* <Details name={data.username} bio={data.bio} /> */}

          <Details name={data?.username} bio={data?.bio} />
        </div>
      </div>
      {data && <Posts id={data.username} />}
      <div className="fixed bottom-6 right-6">
        {isowner && (
          <Button
            text="+ Create Post"
            onClick={() => navigate("/create-post")}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;

