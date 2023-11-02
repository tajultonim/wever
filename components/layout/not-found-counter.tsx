"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFoundCounter() {
  const router = useRouter();
  const [secs, setSecs] = useState(10);
  useEffect(() => {
    let t = setInterval(() => {
      setSecs((prev) => prev - 1);
      if (secs <= 0) {
        clearInterval(t);
        router.push("/");
      }
    }, 1000);
    return () => {
      clearInterval(t);
    };
  });

  return (
    <p className=" text-[var(--c-l7)] text-lg ">
      {secs > 0 ? (
        <>
          Redirecting to{" "}
          <Link href="/" className=" underline cursor-pointer">
            home
          </Link>{" "}
          in {secs} second
        </>
      ) : (
        <>
          Redirecting to{" "}
          <Link href="/" className=" underline cursor-pointer">
            home
          </Link>
          ...
        </>
      )}
    </p>
  );
}
