import { ReactNode } from "react";
import { HomeFeedTogele } from "@/components/buttons/home-feed-toogle";
import { CreateRoom } from "@/components/layout/create-room";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home — WEVER",
};

export default function HomeTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <div className=" flex pb-2 sm:hidden">
        <HomeFeedTogele />
      </div>
      <div className=" grid gap-2">{children}</div>
      <div className=" sm:hidden">
        <CreateRoom />
      </div>
    </>
  );
}
