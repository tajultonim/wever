import { FC } from "react";
import { GiHand } from "react-icons/gi";
import { RiLiveFill, RiSettings3Line } from "react-icons/ri";
import { SidebarOption } from "./sidebar-option";
import { LuMessagesSquare, LuBell } from "react-icons/lu";
import { HiStatusOnline } from "react-icons/hi";
import { MdTimeline } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";

import { useSession } from "next-auth/react";

const OptionsSidebar: FC = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="grid gap-2 justify-end">
        <div className=" grid rounded-2xl shadow-sm bg-white gap-2 p-2">
          <SidebarOption Icon={GiHand} title="Instamatch" onClick={() => {}} />
          <SidebarOption
            Icon={RiLiveFill}
            title="Livestream"
            onClick={() => {}}
          />
        </div>
        <div className=" rounded-2xl shadow-sm bg-white grid gap-2 p-2">
          <SidebarOption
            Icon={LuBell}
            title="Notification"
            onClick={() => {}}
            blinker={true}
          />
          <SidebarOption
            Icon={LuMessagesSquare}
            title="Message"
            onClick={() => {}}
          />
          <SidebarOption Icon={MdTimeline} title="Feed" onClick={() => {}} />
          <SidebarOption
            Icon={HiStatusOnline}
            title="Active Now"
            onClick={() => {}}
          />
        </div>
        <div className=" rounded-2xl shadow-sm bg-white grid gap-2 p-2">
          <SidebarOption
            Icon={RiSettings3Line}
            title="Settings"
            onClick={() => {}}
          />
          <SidebarOption
            Icon={session?.user?.image || BsFillPersonFill}
            title="Profile"
            onClick={() => {}}
          />{" "}
        </div>
      </div>
    </>
  );
};
export { OptionsSidebar };
