import { CreateRoom } from "@/components/layout/create-room";
import { HomeFeedTogele } from "@/components/buttons/home-feed-toogle";
import { UnderConstruction } from "@/components/layout/under-construction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications — WEVER",
};

export default function Notification() {
  return (
    <>
      <div className=" grid gap-2">
        <UnderConstruction />
      </div>
    </>
  );
}
