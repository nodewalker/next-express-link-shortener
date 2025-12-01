"use client";

import { Button, Input } from "@/app/_components";
import { UserContext } from "@/app/_lib/providers/UserProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Reg = () => {
  const [error, setError] = useState<string | null>(null);
  const { user, handleUserReg } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user.id) router.push("/");
  }, [user, router]);

  return (
    <div className="max-w-[500px] w-full mx-auto py-10 px-2.5 flex flex-col gap-4">
      <div className="text-center  font-bold text-[24px]">Registration</div>
      {error && (
        <div className="font-medium text-[16px] bg-[#e93e3e] py-2 px-3 rounded-2xl">
          {error}
        </div>
      )}
      <form
        action={(data: FormData) => handleUserReg(data, setError)}
        className="flex flex-col gap-3"
      >
        <Input name="username" placeholder="Username" required />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <Button value={"Reg"} type="submit" />
      </form>
      <div className="text-center">
        Have an account?{" "}
        <Link href={"/auth/login"} className="underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Reg;
