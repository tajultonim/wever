import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import { parseCookies } from "nookies";
import Link from "next/link";
import Head from "next/head";
import noAvatarImg from "../public/img/avatar.svg";
import Header from "@/components/header";
import { useRouter } from "next/router";

let connection: any = null;
let conference: any = null;

export default function Instamatch() {
  const { data: session } = useSession();
  const router = useRouter();
  const [onlineCount, setOnlineCount] = useState(0);
  const [queuedMsg, setQueuedMsg] = useState("Connecting...");
  const [roomId, setRoomId] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerImg, setPartnerImg] = useState("/img/avatar.svg");
  const [isMatched, setIsMatched] = useState(false);
  const [gotOffer, setGotOffer] = useState(false);
  const audioEl = useRef<HTMLAudioElement>(null);
  const [inCall, setInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  function acceptBtnHandler() {}

  return (
    <>
      <Head>
        <title>Instamatch - Talk to strangers</title>
      </Head>

      <div className=" w-full h-full flex justify-center">
        <div className=" pt-3 w-full max-w-sm">
          <Header />
          <audio className=" hidden" controls autoPlay ref={audioEl}></audio>
          <div className=" p-2 flex-col flex w-full justify-center">
            <div className="w-full flex justify-center items-center flex-col max-w-sm">
              <div className=" max-w-xl bg-slate-800 w-full rounded-xl text-black grid grid-cols-2">
                <div className=" py-5 col-span-2 text-white flex justify-center flex-col items-center">
                  <p> Currently Online: {onlineCount}</p>
                </div>
                <div className=" py-5 w-full flex-col flex justify-center items-center h-full">
                  <div className="relative overflow-hidden w-1/2 aspect-square object-cover rounded-full">
                    <Image
                      alt={session?.user?.name || ""}
                      src={session?.user?.image || noAvatarImg}
                      fill={true}
                      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                    />
                  </div>
                  <div className=" text-white font-semibold text-lg mt-2">
                    {session?.user?.name?.split(" ")[0]}
                  </div>
                </div>
                <div className=" w-full flex-col flex justify-center items-center h-full">
                  <div className="relative overflow-hidden w-1/2 aspect-square object-cover rounded-full">
                    {partnerImg && (
                      <Image alt={partnerName} src={partnerImg} fill={true} />
                    )}
                  </div>
                  <div className=" font-semibold text-white text-lg mt-2">
                    {partnerName.split(" ")[0]}
                  </div>
                </div>

                <div className="py-5 col-span-2 flex flex-col justify-center items-center">
                  {isMatched && (
                    <>
                      {!inCall ? (
                        <button
                          onClick={async () => {
                            await acceptBtnHandler();
                          }}
                          className=" text-white p-1 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded font-semibold py-1"
                        >
                          Accept
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsMuted((prev) => {
                              return !prev;
                            });
                          }}
                          className=" text-white p-1 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded font-semibold py-1"
                        >
                          {isMuted ? "Unmute" : "Mute"}
                        </button>
                      )}
                      <button
                        className=" text-blue-500 font-semibold py-1"
                        onClick={() => {}}
                      >
                        Skip
                      </button>
                    </>
                  )}
                  <div className=" text-white">{queuedMsg}</div>
                </div>
              </div>
            </div>
            <Link href="/">
              <button className=" px-2 bg-slate-800 w-full text-gray-400 rounded-xl mt-2 py-2 font-semibold">
                Go to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
