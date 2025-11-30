"use client";

import { createContext, useEffect, useState } from "react";
import { LoginInfo, RegInfo, UserDetails } from "../types";
import { fetchApi, fetchApiWithAuth } from "../api";

export const UserContext = createContext({
  user: { id: null, username: null } as UserDetails,
  handleUserReg: (details: RegInfo) => {},
  handleUserLogin: (details: LoginInfo) => {},
  logOut: () => {},
});

export const UserProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState({ id: null, username: null });

  const handleUserLogin = async (details: LoginInfo) => {
    const res = await fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify(details),
    });

    if (res.msg === "success") {
      setUser({ id: res.data.user.id, username: res.data.user.usename });
      localStorage.setItem("access_token", res.data.tokens.access_token);
      localStorage.setItem("refresh_token", res.data.tokens.refresh_token);
    }
  };

  const handleUserReg = async (details: RegInfo) => {
    const res = await fetchApi("/auth/reg", {
      method: "POST",
      body: JSON.stringify(details),
    });

    if (res.msg === "success") {
      setUser({ id: res.data.user.id, username: res.data.user.usename });
      localStorage.setItem("access_token", res.data.tokens.access_token);
      localStorage.setItem("refresh_token", res.data.tokens.refresh_token);
    }
  };

  const logOut = async () => {
    setUser({ id: null, username: null });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  useEffect(() => {
    const openApp = async () => {
      const user = await fetchApiWithAuth("/user/profile", { method: "GET" });
      if (user.msg === "status") {
        setUser({ id: user.data.id, username: user.data.username });
      }
    };

    openApp();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, handleUserReg, handleUserLogin, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
