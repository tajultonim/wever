import { RoomCard } from "@/components/layout/roomcard";

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
