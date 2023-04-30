import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <div className=" w-full h-full flex justify-center">
        <div className="p-2 w-full max-w-sm">
          <header className=" w-full border-b pb-1 ">
            <h1 className=" text-4xl font-medium ">HiGuys</h1>
          </header>
          <main className=" w-full flex justify-center items-center py-2 flex-col">
            <div className="relative overflow-hidden w-1/3 aspect-square object-cover rounded-full">
              <Image
                alt={session?.user?.name || ""}
                src={session?.user?.image || ""}
                fill={true}
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
