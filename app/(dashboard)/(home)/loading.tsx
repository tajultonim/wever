import { SkeletonRoomCard } from "@/components/layout/roomcard";

export default function Loading() {
  return (
    <>
      <SkeletonRoomCard />
      <SkeletonRoomCard />
      <SkeletonRoomCard />
    </>
  );
}
