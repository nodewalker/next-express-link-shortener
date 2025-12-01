"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchApi } from "../_lib/api";

export default function Redirect() {
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ short: string }>();
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      const r = await fetchApi(`/link/${params.short}`, { method: "GET" });
      console.log(r);
      if (r.msg === "success") {
        router.push(r.data.long);
      } else if (r.msg === "error") {
        setError(r.error);
      }
    };

    redirect();
  }, [params, router]);

  return (
    <>
      <div className="font-bold text-[24px] text-center">Wait for redirect</div>

      <div className="font-semibold text-[20px] text-center">{error}</div>
    </>
  );
}
