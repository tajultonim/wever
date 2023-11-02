"use client"


import { FC } from "react";
import { useRouter, usePathname } from "next/navigation";

const HomeFeedTogele: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className=" bg-[var(--c-l1)] text-white flex rounded-2xl">
        <button
          onClick={() => {
            router.push("/");
          }}
          disabled={pathname == "/"}
          className=" text-[var(--c-l6)] disabled:text-inherit disabled:bg-[var(--c-l6)] p-1 px-2 rounded-2xl"
        >
          Home
        </button>
        <button
          onClick={() => {
            router.push("/feed");
          }}
          disabled={pathname == "/feed"}
          className=" text-[var(--c-l6)] disabled:text-inherit disabled:bg-[var(--c-l6)] p-1 px-2 rounded-2xl"
        >
          Feed
        </button>
      </div>
    </>
  );
};

export { HomeFeedTogele };
