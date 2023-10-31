import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { RoomCard } from "@/components/roomcard";
import { Spinner } from "@/components/spinner";
import { CreateRoom } from "@/components/create-room";
import { ProfileSidebar } from "@/components/profile-sidebar";
import { OptionsSidebar } from "@/components/options-sidebar";
export default function Home() {
  return (
    <>
      <Head>
        <title>WEVER</title>
        <meta name="description" content="Beta test for Higuys!" />
      </Head>
      <Layout RightSidebar={ProfileSidebar} LeftSidebar={OptionsSidebar}>
        <div className=" flex pb-2 sm:hidden">
          <div className=" bg-[var(--c-l1)] text-white flex rounded-2xl w-auto">
            <button className="bg-[var(--c-l6)] p-1 px-2 rounded-2xl">
              Home
            </button>
            <button className="text-[var(--c-l6)] p-1 px-2 rounded-2xl">
              Feed
            </button>
          </div>
        </div>
        <div className=" grid gap-2">
          <RoomCard
            title="Redesign UI"
            img="/img/avatar.svg"
            host="Tonim"
            participants={10}
            speakers={["Ria", "Rahaat", "Sara", "Nobody"]}
          />
          <RoomCard
            title="Redesign UI"
            img="/img/avatar.svg"
            host="Tonim"
            participants={10}
            speakers={[]}
          />
          <RoomCard
            title="Redesign UI"
            img="/img/avatar.svg"
            host="Tonim"
            participants={10}
            speakers={["Ria", "Rahaat","Nobody"]}
          />
          <RoomCard
            title="Redesign UI"
            img="/img/avatar.svg"
            host="Tonim"
            participants={10}
            speakers={["Ria"]}
          />
          <RoomCard
            title="Redesign UI"
            img="/img/avatar.svg"
            host="Tonim"
            participants={10}
            speakers={["Ria", "Rahaat", "Sara", "Nobody"]}
          />
          <RoomCard
            title="Redesign UI"
            img="/img/avatar.svg"
            host="Tonim"
            participants={10}
            speakers={["Ria", "Rahaat", "Sara", "Nobody"]}
          />
          <Spinner />
          <div className=" sm:hidden">
            <CreateRoom />
          </div>
        </div>
      </Layout>
    </>
  );
}
