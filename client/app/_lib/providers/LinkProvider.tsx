"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LinkDetails } from "../types";
import { UserContext } from "./UserProvider";
import { fetchApiWithAuth } from "../api";

export const LinkContext = createContext({
  links: [] as LinkDetails[],
  linkLoading: false,
  addLink: (details: LinkDetails) => {},
  removeLink: (linkId: number) => {},
  logOut: () => {},
});

export const LinkProvider = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useContext(UserContext);
  const [links, setLinks] = useState<LinkDetails[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const addLink = (details: LinkDetails) => {
    setLinks([...links, details]);
  };

  const removeLink = async (linkId: number) => {
    const r = await fetchApiWithAuth("/link", {
      method: "DELETE",
      body: JSON.stringify({ linkId }),
    });
    if (r.msg === "success")
      setLinks([...links.filter((el) => el.id !== linkId)]);
  };

  const logOut = () => {
    setLinks([]);
  };

  useEffect(() => {
    const getLinks = async () => {
      if (!user.id) {
        setLoading(true);
        return;
      }
      const r = await fetchApiWithAuth("/link", { method: "GET" });
      if (r.msg === "success") setLinks(r.data);
      setLoading(true);
    };

    getLinks();
  }, [user]);

  return (
    <LinkContext.Provider
      value={{ links, linkLoading: isLoading, addLink, removeLink, logOut }}
    >
      {children}
    </LinkContext.Provider>
  );
};
