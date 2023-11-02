import { CreateRoom } from "@/components/layout/create-room";
import { HomeFeedTogele } from "@/components/buttons/home-feed-toogle";
import { UnderConstruction } from "@/components/layout/under-construction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed — WEVER",
};

export default function Feed() {
  return (
    <>
      <div className=" flex pb-2 sm:hidden">
        <HomeFeedTogele />
      </div>
      <div className=" grid gap-2">
        <UnderConstruction />
      </div>
    </>
  );
}
