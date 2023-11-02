import Image from "next/image";
import noAvaterImg from "../../public/img/avatar.svg";
import { LuMessagesSquare, LuBell } from "react-icons/lu";
import { Blinker } from "./blinker";
import { Search } from "../inputs/search";
import Link from "next/link";

export default function Header() {
  const session = {
    user:{
      name:undefined,
      image:undefined
    }
  };

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
            <Link href={"/message"} className="h-8 w-8 p-1">
              <LuMessagesSquare className="w-full h-full" />
            </Link>
          </Blinker>
          <Blinker
            className=" hover:cursor-pointer hover:bg-[var(--c-l2)] rounded-full p-1"
            active={false}
          >
            <Link href={"/notifications"} className="h-8 w-8 p-1">
              <LuBell className="w-full h-full" />
            </Link>
          </Blinker>
        </div>
        <div className=" flex items-center gap-3">
          <div className="hidden sm:flex items-center w-full ml-16 rounded-3xl shadow-sm overflow-hidden">
            <Search />
          </div>
          <p className=" text-[var(--c-l7)] font-bold text-2xl">WEVER</p>
        </div>
      </div>
      <div className="sm:hidden  mt-4">
     
        <Search />
      </div>
    </>
  );
}
