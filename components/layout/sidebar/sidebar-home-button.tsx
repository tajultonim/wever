"use client";
import { FC } from "react";
import { MdTimeline } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { SidebarOption } from "./sidebar-option";

const HomeFeedButton: FC = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname == "/" ? (
        <SidebarOption Icon={MdTimeline} title="Feed" slug="/feed" />
      ) : (
        <SidebarOption Icon={RiHomeLine} title="Home" slug="/" />
      )}
    </>
  );
};

export default HomeFeedButton;
