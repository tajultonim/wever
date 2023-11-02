import { RoomCard } from "@/components/layout/roomcard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home — WEVER",
};

export default function Home() {
  return (
    <>
      <RoomCard
        title="Kringe সমাচার 😪"
        img="/img/avatar.svg"
        host="Tonim🦥"
        participants={10}
        speakers={["Ria🦜", "Rahaat", "Ara", "Nobody"]}
      />
    </>
  );
}
