import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/header";
import noAvaterImg from "../public/img/avatar.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Higuys - Not Hilokal 🥴</title>
        <meta name="description" content="Beta test for Higuys!" />
      </Head>
      <div className=" w-full h-full flex justify-center">
        <div className=" pt-5 w-full max-w-sm">
          <Header />
          <main className=" p-2 w-full flex justify-center items-center py-2 flex-col">
            <div className=" w-full rounded-xl bg-slate-800">
              <div className=" border-b border-gray-700 p-3 pb-2 flex w-full items-center">
                <div className="relative rounded-full overflow-hidden w-8 h-8 aspect-square object-cover">
                  <Image
                    alt={session?.user?.name || ""}
                    src={session?.user?.image || noAvaterImg}
                    fill={true}
                    sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
                  />
                </div>
                <p className=" ml-2">
                  Let&apos;s dive into practice :)
                </p>
              </div>
              <div className=" w-full grid grid-cols-2">
                <div className="p-2 border-r border-gray-700">
                  <button
                    className=" w-full h-full"
                    onClick={() => {
                      alert("Comming (not soon) 😑");
                    }}
                  >
                    Livestream
                  </button>
                </div>
                <div className="p-2">
                  <button
                    className=" w-full h-full"
                    onClick={() => {
                      router.push("/instamatch");
                    }}
                  >
                    Instamatch
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
