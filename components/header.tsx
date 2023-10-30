import Image from "next/image";
import noAvaterImg from "../public/img/avatar.svg";
import logoImg from "../public/icons/icon-192x192.png";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LuMessagesSquare, LuBell } from "react-icons/lu";
import { Blinker } from "./blinker";
import { Search } from "./search";

export default function Header() {
  const { data: session } = useSession();
  const [isOnline, setIsOnline] = useState(true);
  const [isProfileOptionEnabled, setIsProfileOptionEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("online", () => {
      setIsOnline(true);
    });
    window.addEventListener("offline", () => {
      setIsOnline(false);
    });
    setIsOnline(window.navigator.onLine);
  }, []);

  return (
    <>
      <div className="flex justify-between ">
        <div className="hidden sm:block"></div>
        <div className=" sm:hidden flex items-center gap-1">
          <div className=" relative h-10 aspect-square rounded-full overflow-hidden">
            <Image
              alt="Profile Image"
              fill
              src={session?.user?.image || noAvaterImg}
            />
          </div>
          <Blinker
            className=" hover:cursor-pointer hover:bg-[var(--c-l2)] rounded-full p-1"
            active={true}
          >
            <div className="h-8 w-8 p-1">
              <LuMessagesSquare className="w-full h-full" />
            </div>
          </Blinker>
          <Blinker
            className=" hover:cursor-pointer hover:bg-[var(--c-l2)] rounded-full p-1"
            active={false}
          >
            <div className="h-8 w-8 p-1">
              <LuBell className="w-full h-full" />
            </div>
          </Blinker>
        </div>
        <div className=" flex items-center gap-3">
          <div className="hidden sm:flex bg-white items-center w-full ml-16 h-10 rounded-3xl shadow-sm overflow-hidden">
            <Search />
          </div>
          <p className=" text-[var(--c-l7)] font-bold text-2xl">WEVER</p>
        </div>
      </div>
      <div className=" sm:hidden bg-white items-center mt-4 w-full flex h-10 rounded-3xl shadow-sm overflow-hidden">
        <Search />
      </div>
    </>
  );

  return (
    <>
      {!isOnline && (
        <div className=" -mt-3 bg-red-500 p-2 rounded-t mb-2">No internet!</div>
      )}
      <header className=" px-2 w-full border-b border-gray-600 pb-2 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
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
        </div>
        <div>
          <div
            className="relative cursor-pointer rounded-full overflow-hidden w-8 h-8 aspect-square object-cover"
            onClick={() => {
              setIsProfileOptionEnabled((prev) => !prev);
            }}
          >
            <Image
              alt={session?.user?.name || ""}
              src={session?.user?.image || noAvaterImg}
              fill={true}
              sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
            />
          </div>
          <div
            className={`${
              isProfileOptionEnabled
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0"
            } origin-top-right duration-300  p-1 box-border w-52 -translate-x-[175px] translate-y-3 absolute bg-gray-500 rounded-xl flex justify-center flex-col items-center`}
          >
            <p className=" pb-[2px] whitespace-nowrap font-semibold">
              {session?.user?.name}
            </p>
            <p className=" pb-[2px] whitespace-nowrap text-xs">
              {session?.user?.email}
            </p>
            <button
              onClick={() => {
                signOut();
              }}
              className=" mt-1 p-1 rounded-xl bg-gray-600 w-full "
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
