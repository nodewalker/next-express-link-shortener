"use client";

import { Input, Button } from "@/app/_components";
import { UserContext } from "@/app/_lib/providers/UserProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const { user, handleUserLogin } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user.id) router.push("/");
  }, [user, router]);

  return (
    <div className="max-w-[500px] w-full mx-auto py-10 px-2.5 flex flex-col gap-4">
      <div className="text-center  font-bold text-[24px]">Login</div>
      {error && (
        <div className="font-medium text-[16px] bg-[#e93e3e] py-2 px-3 rounded-2xl">
          {error}
        </div>
      )}
      <form
        action={(data: FormData) => handleUserLogin(data, setError)}
        className="flex flex-col gap-3"
      >
        <Input name="username" placeholder="Username" required />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <Button value={"Login"} type="submit" />
      </form>
      <div className="text-center">
        {"Haven't account? "}
        <Link href={"/auth/reg"} className="underline">
          Reg
        </Link>
      </div>
    </div>
  );
};

export default Login;
