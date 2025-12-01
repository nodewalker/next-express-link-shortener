"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/app/_lib/providers/UserProvider";
import { fetchApiWithAuth } from "@/app/_lib/api";
import { LinkContext } from "@/app/_lib/providers/LinkProvider";
import { LinkList } from "@/app/_components/LinkList";
import { Header, Input, Button } from "../_components";

const Home = () => {
  const [error, setError] = useState<string | null>(null);
  const { user, userLoading } = useContext(UserContext);
  const { links, addLink, linkLoading } = useContext(LinkContext);

  const shortAction = async (formData: FormData) => {
    const longLink = formData.get("longLink");
    if (!longLink) return;
    const r = await fetchApiWithAuth("/link/", {
      method: "POST",
      body: JSON.stringify({ longLink }),
    });
    if (r.msg === "success") addLink(r.data);
    else if (r.msg === "error") setError(r.error);
  };

  return (
    <>
      <Header />
      <div className="max-w-[500px] px-2.5 w-full mx-auto">
        <div className="my-10 flex flex-col gap-5">
          <div className="font-bold text-[32px] text-center">URL Shortener</div>
          {error && (
            <div className="font-medium text-[16px] bg-[#e93e3e] py-2 px-3 rounded-2xl">
              {error}
            </div>
          )}
          <form action={shortAction} className="flex flex-col gap-3">
            <Input
              name="longLink"
              placeholder="Enter a long URL to shorten"
              disabled={!userLoading || user.id === null}
              type="url"
            />
            <Button value={"Shorten URL"} type="submit" />
          </form>
          <div className="text-[14px] text-[#4F7396]">
            {"Example: https://www.google.com"}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-bold text-[18px]">Shortened URL</div>
          {!linkLoading ? (
            <Input disabled placeholder="Loading..." />
          ) : !links.length ? (
            <Input disabled placeholder="Your haven't link" />
          ) : (
            <LinkList data={links} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
