import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";

let socket: Socket = io(process.env.SOCKET_SERVER || "", {
  autoConnect: false,
});
export default function Instamatch() {
  const { data: session } = useSession();
  const [onlineCount, setOnlineCount] = useState(0);
  const [queuedMsg, setQueuedMsg] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [myName, setMyName] = useState("");

  useEffect(() => {
    // const servers = {
    //   iceServers: [
    //     {
    //       urls: [
    //         "stun:stun1.l.google.com:19302",
    //         "stun:stun2.l.google.com:19302",
    //       ],
    //     },
    //   ],
    //   iceCandidatePoolSize: 10,
    // };
    // let pc = new RTCPeerConnection(servers);

    // let localStream = null;
    // let remoteStream = null;

    socket.connect();
    socket.on("connect", () => {
      setMyName(socket.id);
      socket.emit("start", socket.id);
    });
    socket.on("currentlyOnline", setOnlineCount);
    socket.on("queued", setQueuedMsg);
    socket.on("matched", (data) => {
      setQueuedMsg("Matched");
      setPartnerName(data.ids[0] == socket.id ? data.ids[1] : data.ids[0]);
    });

    socket.on("pdisconnected", () => {
      setPartnerName("");
      socket.emit("start", socket.id);
    });

    socket.on("ydisconnected", () => {
      setPartnerName("");
      socket.emit("start", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col">
        <div className=" mt-32 text-black -mb-32 z-10">
          <p> Currently Online: {onlineCount}</p>
          <p> Looking for a partner...</p>
        </div>
        <div className=" max-w-xl bg-blue-200 w-full m-10 rounded text-black grid grid-cols-2 aspect-square">
          <div className=" w-full flex-col flex justify-center items-center h-full">
            <div className="relative overflow-hidden w-1/2 aspect-square object-cover rounded-full">
              <Image
                alt={session?.user?.name || ""}
                src={session?.user?.image || ""}
                fill={true}
              />
            </div>
            <div className=" font-semibold text-xl mt-2">{myName}</div>
          </div>
          <div className=" w-full flex-col flex justify-center items-center h-full">
            <div className="relative overflow-hidden w-1/2 aspect-square object-cover rounded-full">
              <Image
                alt={session?.user?.name || ""}
                src={session?.user?.image || ""}
                fill={true}
              />
            </div>
            <div className=" font-semibold text-xl mt-2">{partnerName}</div>
          </div>
        </div>
        <div className="-mt-40 flex flex-col">
          <button className=" bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded font-semibold py-1">
            Accept
          </button>
          <button
            className=" text-blue-500 font-semibold py-1"
            onClick={() => {
              socket.emit("stop");
            }}
          >
            Skip
          </button>
          <div className=" text-black">{queuedMsg}</div>
        </div>
      </div>
    </>
  );
}
