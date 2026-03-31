import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
const root = "https://dvw9ddc4-8000.inc1.devtunnels.ms/";
//---------------------------Login-----------------------------
export const login = (UserName: string, Password: string) => {
  return (e: React.FormEvent) => {
    e.preventDefault();
    fetch(root + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserName,
        password: Password,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        document.cookie = `refresh_token=${data.refresh_token}`;
        window.location.href = "/profile";
      })
      .catch((err) => {
        alert("Invalid credentials: " + err);
      });
  };
};
//---------------------------SignUp-----------------------------
export const signup = (UserName: string, Email: string, Password: string) => {
  return (e: React.FormEvent) => {
    e.preventDefault();
    fetch(root + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: UserName,
        email: Email,
        password: Password,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status != 201) {
          //   res.json();
          throw new Error(res.detail);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res.access_token);
        document.cookie = `refresh_token=${res.refresh_token}`;
        alert("Account created successfully");
        redirect("/");
      })
      .catch((err) => {
        console.error("Sign up error:", err);
        alert("An error occurred during sign up");
        // navigate("/");
      });
  };
};
//---------------------------Token check-----------------------------
export const check_token = async () => {
  try {
    const res = await fetch(root + "users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (res.status !== 200) {
      throw new Error("Invalid token");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    new_token();
  }
};

export const new_token = async () => {
  fetch(root + "auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: document.cookie.split("=").slice(1).join("="), // full token preserved,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("access_token", data.access_token);
      document.cookie = `refresh_token=${data.refresh_token}; path=/`;
    })
    .catch((err) => {
      alert("Invalid credentials: " + err);
    });
};
//---------------------------Get details-----------------------------
export const getdetails = async () => {
  try {
    const res = await fetch(root + "users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (res.status !== 200) {
      throw new Error("Invalid token");
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    new_token();
  }
};
