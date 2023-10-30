import { FC } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import noAvaterImg from "../public/img/avatar.svg";

const ProfileSidebar: FC = () => {
  const { data: session } = useSession();
  return (
    <div className=" shadow-sm bg-white rounded-xl w-full flex flex-col items-center p-2">
      <div className=" relative w-1/3 aspect-square rounded-full overflow-hidden">
        <Image
          alt={session?.user?.name || ""}
          src={session?.user?.image || noAvaterImg}
          fill
        />
      </div>
      <p className=" text-[var(--c-l7)] truncate">{session?.user?.name}</p>
      <p className=" text-xs truncate">{session?.user?.email}</p>
      <div className=" flex gap-2">
        <button
          className=" border-[var(--c-l6)] border-2 border-solid hover:border-[var(--c-l4)] hover:text-[var(--c-l4)] text-[var(--c-l6)] px-2 py-1 text-sm rounded-lg mt-2"
          onClick={() => {}}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export { ProfileSidebar };
