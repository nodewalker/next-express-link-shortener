"use client";

import { useRouter } from "next/navigation";
import { LinkDetails } from "../_lib/types";
import { useContext } from "react";
import { LinkContext } from "../_lib/providers/LinkProvider";

export const Link = ({ details }: { details: LinkDetails }) => {
  const { removeLink } = useContext(LinkContext);
  const router = useRouter();

  return (
    <div className="w-full p-4 rounded-2xl bg-[#E8EDF2]">
      <div
        className="font-medium text-[18px] cursor-pointer"
        onClick={() =>
          navigator.clipboard.writeText(`http://localhost:3000/${details.id}`)
        }
      >
        {details.id}
      </div>
      <div
        className="text-[14px] text-[#4F7396] cursor-pointer hover:underline mt-4 mb-2"
        onClick={() => router.push(details.long)}
      >
        {details.long}
      </div>
      <div className="cursor-pointer" onClick={() => removeLink(details.id)}>
        delete
      </div>
    </div>
  );
};

export const LinkList = ({ data }: { data: LinkDetails[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {data.map((el) => (
        <Link details={el} key={el.id} />
      ))}
    </div>
  );
};
