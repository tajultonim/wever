import { FC } from "react";
import { GiHand } from "react-icons/gi";
import { HiStatusOnline } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { LuMessagesSquare, LuBell } from "react-icons/lu";
import { RiLiveFill, RiSettings3Line } from "react-icons/ri";
import { SidebarOption } from "./sidebar-option";
import HomeFeedButton from "./sidebar-home-button";
import ProfileOption from "./profile-option";



const OptionsSidebar: FC = () => {
 

  return (
    <>
      <div className="grid gap-2 justify-end">
        <div className=" grid rounded-2xl shadow-sm bg-white gap-2 p-2">
          <SidebarOption Icon={GiHand} title="Instamatch" slug="instamatch" />
          <SidebarOption
            Icon={RiLiveFill}
            title="Livestream"
            slug="/livestream"
          />
        </div>
        <div className=" rounded-2xl shadow-sm bg-white grid gap-2 p-2">
          <HomeFeedButton />
          <SidebarOption
            Icon={LuMessagesSquare}
            title="Message"
            slug="/message"
          />
          <SidebarOption
            Icon={LuBell}
            title="Notification"
            blinker={true}
            slug="/notifications"
          />
          <SidebarOption
            Icon={HiStatusOnline}
            title="Active Now"
            slug="/active-now"
          />
        </div>
        <div className=" rounded-2xl shadow-sm bg-white grid gap-2 p-2">
          <SidebarOption
            Icon={RiSettings3Line}
            title="Settings"
            slug="settings"
          />
          <ProfileOption/>
        </div>
      </div>
    </>
  );
};
export { OptionsSidebar };
