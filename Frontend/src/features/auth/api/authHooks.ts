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
      // with sessions we just rely on the server response (e.g., calling users/me would be better but for now let's just assume we check session some other way)
      // actually useRedirectIfLoggedIn should probably call /users/me to see if logged in.
      // Let's call /users/me to verify session
      try {
        const res = await fetch(root + "users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (res.status === 200) {
          navigate("/profile", { replace: true });
        } else {
          setChecking(false);
        }
      } catch (err) {
        setChecking(false);
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
    // Removed localStorage token check since we are using sessions.
    const verify = async () => {
      try {
        // return 
        const res = await fetch(root + "users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
