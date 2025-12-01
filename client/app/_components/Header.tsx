"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../_lib/providers/UserProvider";
import { LinkContext } from "../_lib/providers/LinkProvider";

export const Header = () => {
  const router = useRouter();
  const { user, userLoading, logOut } = useContext(UserContext);
  const linkContext = useContext(LinkContext);

  return (
    <div className="mx-auto w-full h-[60px] container flex items-center justify-between">
      <div className="font-bold text-[18px]">Short Link</div>
      <div className="flex gap-2">
        {user.id || !userLoading ? (
          <>
            <button
              className={`${
                !userLoading ? "bg-[#979a9c]" : "bg-[#E8EDF2]"
              } py-2.5 px-4 font-bold rounded-xl cursor-pointer`}
              onClick={() => {
                logOut();
                linkContext.logOut();
              }}
            >
              {!userLoading ? "" : "Log out"}
            </button>
            <div
              className={`w-10 h-10 rounded-4xl ${
                !userLoading ? "bg-[#979a9c]" : "bg-[#333]"
              }`}
            >
              {/* <Image src={""} alt={""} /> */}
            </div>
          </>
        ) : (
          <>
            <button
              className="py-2.5 px-4 font-bold bg-[#1A80E5] text-[#F7FAFC] rounded-xl cursor-pointer"
              onClick={() => {
                router.push("/auth/reg");
              }}
            >
              Sign up
            </button>
            <button
              className="py-2.5 px-4 font-bold bg-[#E8EDF2] rounded-xl cursor-pointer"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};
