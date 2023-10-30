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
        {/* <main className=" p-2 w-full flex justify-center items-center py-2 flex-col">
          <div className=" w-full rounded-xl bg-slate-800">
            <div className=" border-b border-gray-700 p-3 py-4 flex w-full items-center">
              <div className="relative rounded-full overflow-hidden w-10 h-10 aspect-square object-cover">
                <Image
                  alt={session?.user?.name || ""}
                  src={session?.user?.image || noAvaterImg}
                  fill={true}
                  sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
                />
              </div>
              <p className=" ml-2 text-lg font-medium">
                Let&apos;s dive into practice :)
              </p>
            </div>
            <div className=" w-full grid grid-cols-2">
              <div className="p-2 border-r border-gray-700">
                <button
                  className=" w-full h-full text-lg font-medium text-gray-400"
                  onClick={() => {
                    router.push("/livestream/" + session?.user?.name);
                  }}
                >
                  Livestream
                </button>
              </div>
              <div className="p-2">
                <button
                  className=" w-full h-full text-lg font-medium text-gray-400"
                  onClick={() => {
                    router.push("/instamatch");
                  }}
                >
                  Instamatch
                </button>
              </div>
            </div>
          </div>
        </main> */}
      </Layout>
    </>
  );
}
