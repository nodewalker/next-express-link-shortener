"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { LoginInfo, RegInfo, UserDetails } from "../types";
import { fetchApi, fetchApiWithAuth } from "../api";

export const UserContext = createContext({
  user: { id: null, username: null } as UserDetails,
  userLoading: false,
  handleUserReg: (
    details: FormData,
    setError: Dispatch<SetStateAction<string | null>>
  ) => {},
  handleUserLogin: (
    details: FormData,
    setError: Dispatch<SetStateAction<string | null>>
  ) => {},
  logOut: () => {},
});

export const UserProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState({ id: null, username: null });
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleUserLogin = async (
    details: FormData,
    setError: Dispatch<SetStateAction<string | null>>
  ) => {
    const loginInfo: LoginInfo = {
      username: details.get("username") as string,
      password: details.get("password") as string,
    };
    const res = await fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
    });

    if (res.msg === "success") {
      setUser({ id: res.data.user.id, username: res.data.user.usename });
      localStorage.setItem("access_token", res.data.tokens.access_token);
      localStorage.setItem("refresh_token", res.data.tokens.refresh_token);
    } else if (res.msg === "error") {
      setError(res.error);
    }
  };

  const handleUserReg = async (
    details: FormData,
    setError: Dispatch<SetStateAction<string | null>>
  ) => {
    const regInfo: RegInfo = {
      username: details.get("username") as string,
      password: details.get("password") as string,
    };
    console.log(regInfo);
    console.log(JSON.stringify(regInfo));
    const res = await fetchApi("/auth/reg", {
      method: "POST",
      body: JSON.stringify(regInfo),
    });

    if (res.msg === "success") {
      setUser({ id: res.data.user.id, username: res.data.user.usename });
      localStorage.setItem("access_token", res.data.tokens.access_token);
      localStorage.setItem("refresh_token", res.data.tokens.refresh_token);
    } else if (res.msg === "error") {
      setError(res.error);
    }
  };

  const logOut = () => {
    setUser({ id: null, username: null });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  useEffect(() => {
    const openApp = async () => {
      setLoading(true);
      const user = await fetchApiWithAuth("/user/profile", { method: "GET" });
      if (user.msg === "success") {
        setUser({ id: user.data.id, username: user.data.username });
      }
    };

    openApp();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userLoading: isLoading,
        handleUserReg,
        handleUserLogin,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
