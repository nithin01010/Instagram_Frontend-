import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { root } from "./config";

/**
 * For guest pages (Login, SignUp).
 * If user already has a valid token, redirect them to /profile.
 * Returns `checking` — true while validation is in progress.
 */
export const useRedirectIfLoggedIn = (): boolean => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  // handles side effects
  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("access_token");

      if (!token || token === "undefined") {
        // No auth token
        setChecking(false);
        return;
      } else {
        navigate("/profile", { replace: true });
      }
    };

    run();
  }, [navigate]);

  return checking;
};

/**
 * For protected pages (Profile, etc.).
 * If user has no valid token, redirect them to /.
 * Returns `authenticated` — true once the token is confirmed valid.
 */
export const useRequireAuth = (): boolean => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token || token === "undefined") {
      navigate("/", { replace: true });
      return;
    }
    const verify = async () => {
      try {
        const res = await fetch(root + "users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (res.status !== 200) {
          navigate("/", { replace: true });
        } else {
          setAuthenticated(true);
        }
      } catch (err) {
        navigate("/", { replace: true });
      }
    };

    // We must ACTUALLY CALL the function we just defined!
    verify();
  }, [navigate]);

  return authenticated;
};
