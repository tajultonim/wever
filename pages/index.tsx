import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import noAvaterImg from "../public/img/avatar.svg";
import logoImg from "../public/icons/icon-192x192.png";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Higuys - Not Hilokal 🥴</title>
        <meta name="description" content="Beta test for Higuys!" />
      </Head>
      <div className=" w-full h-full flex justify-center">
        <div className="p-2 w-full max-w-sm">
          <header className=" pl-2 w-full border-b border-gray-600 pb-2 flex items-center">
            <div className="relative overflow-hidden w-8 h-8 aspect-square object-cover">
              <Image
                alt="HiGuys"
                src={logoImg}
                fill={true}
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </div>
            <h1 className=" pl-1 text-3xl font-medium ">HiGuys</h1>
          </header>
          <main className=" w-full flex justify-center items-center py-2 flex-col">
            <div className="relative overflow-hidden w-1/3 aspect-square object-cover rounded-full">
              <Image
                alt={session?.user?.name || ""}
                src={session?.user?.image || noAvaterImg}
                fill={true}
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </div>
            <p className=" font-semibold text-2xl">{session?.user?.name}</p>
            <p className=" text-sm">{session?.user?.email}</p>
            <Link href="/instamatch" className=" w-full">
              <button className=" mt-3 font-semibold py-5 text-2xl w-full p-1 bg-blue-400 text-white rounded">
                Instamatch
              </button>
            </Link>
            <button
              onClick={() => {
                signOut();
              }}
              className=" bg-gray-600 w-full text-white rounded-sm mt-3 py-1 font-semibold text-lg"
            >
              Log Out
            </button>
          </main>
        </div>
      </div>
    </>
  );
}
