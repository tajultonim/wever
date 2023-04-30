import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { parseCookies } from "nookies";
import Link from "next/link";
import Head from "next/head";

let socket: Socket = io("", { autoConnect: false });
let pc: RTCPeerConnection;
let offerDescription: RTCSessionDescription;

export default function Instamatch() {
  const { data: session } = useSession();
  const [onlineCount, setOnlineCount] = useState(0);
  const [queuedMsg, setQueuedMsg] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerImg, setPartnerImg] = useState("");
  const [isMatched, setIsMatched] = useState(false);
  const [gotOffer, setGotOffer] = useState(false);
  const audioEl = useRef<HTMLAudioElement>(null);
  const [inCall, setInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    let remoteStream = new MediaStream();

    socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER || "", {
      autoConnect: false,
      auth: {
        token:
          parseCookies()[
            `${
              window.location.href?.startsWith("https://") ? "__Secure-" : ""
            }next-auth.session-token`
          ],
      },
    });
    let goffer = false;
    initRTC();
    socket.connect();
    socket.on("connect", () => {
      socket.emit("start", socket.id);
    });
    socket.on("currentlyOnline", setOnlineCount);
    socket.on("queued", setQueuedMsg);
    socket.on("matched", (data) => {
      setQueuedMsg("Matched");
      setIsMatched(true);
      let partner = data.participants.find(
        (u: { id: string; user: any }) => u.id != socket.id
      );
      setPartnerName(partner.user.name);
      setPartnerImg(partner.user.picture);
    });

    socket.on("pdisconnected", () => {
      setPartnerName("");
      setPartnerImg("");
      setIsMatched(false);
      resetRTC();
      socket.emit("start", socket.id);
    });

    socket.on("ydisconnected", () => {
      setPartnerName("");
      setPartnerImg("");
      setIsMatched(false);
      resetRTC();
      socket.emit("start", socket.id);
    });

    async function initRTC() {
      const servers = {
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
            ],
          },
        ],
        iceCandidatePoolSize: 10,
      };
      pc = new RTCPeerConnection(servers);

      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((stream) => {
          stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream);
          });
        });

      pc.addEventListener("track", pcTrackEvent);

      pc.addEventListener("icecandidate", pcIceCandidateEvent);

      socket.on("offered", (data) => {
        setGotOffer(true);
        goffer = true;
        offerDescription = data;
      });

      socket.on("answered", async (data) => {
        setQueuedMsg("In Call...");
        let answerDescription = new RTCSessionDescription(data);
        if (!pc.currentRemoteDescription && answerDescription) {
          console.log("set remote desc");
          await pc.setRemoteDescription(answerDescription);
        }
      });

      socket.on("answercandidate", (data) => {
        let candidate = new RTCIceCandidate(data);
        pc.addIceCandidate(candidate);
      });
    }

    async function resetRTC() {
      location.reload();
      // setGotOffer(false);
      // goffer = false;
      // if (pc.connectionState == "connected") {
      //   pc.close();
      // }
      // console.log(pc.signalingState);

      // pc.removeEventListener("icecandidate", pcIceCandidateEvent);
      // pc.removeEventListener("track", pcTrackEvent);
      // initRTC();
      // console.log(pc.getConfiguration())
      // console.log(pc.signalingState);
    }

    function pcTrackEvent(ev: RTCTrackEvent) {
      ev.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
      if (audioEl.current) audioEl.current.srcObject = remoteStream;
    }

    function pcIceCandidateEvent(ev: RTCPeerConnectionIceEvent) {
      if (ev.candidate) {
        console.log(goffer);

        if (!goffer) {
          socket.emit("offercandidate", ev.candidate.toJSON());
        } else {
          socket.emit("answercandidate", ev.candidate.toJSON());
        }
      }
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  function setMuteState(m: boolean) {}
  async function acceptBtnHandler() {
    setInCall(true);
    if (!gotOffer) {
      let offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
      let offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };
      socket.emit("ioffer", offer);
    } else {
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );
      socket.on("offercandidate", (data) => {
        let candidate = new RTCIceCandidate(data);
        if (pc.remoteDescription) pc.addIceCandidate(candidate);
      });
      let answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);
      console.log("goff", pc.signalingState);

      let answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };
      socket.emit("ianswer", answer);
      setQueuedMsg("In Call...");
    }
  }

  return (
    <>
      <Head>
        <title>Instamatch - Talk to strangers</title>
      </Head>
      <audio className=" hidden" controls autoPlay ref={audioEl}></audio>
      <div className=" flex-col flex w-full h-full justify-center items-center">
        <div className="w-full h-full flex justify-center items-center flex-col p-4 max-w-sm">
          <div className=" max-w-xl bg-blue-200 w-full m-10 rounded text-black grid grid-cols-2">
            <div className=" py-5 col-span-2 text-black flex justify-center flex-col items-center">
              <p> Currently Online: {onlineCount}</p>
              {/* <p>{gotOffer ? "offered" : "not offered"}</p> */}
            </div>
            <div className=" py-5 w-full flex-col flex justify-center items-center h-full">
              <div className="relative overflow-hidden w-1/2 aspect-square object-cover rounded-full">
                <Image
                  alt={session?.user?.name || ""}
                  src={session?.user?.image || ""}
                  fill={true}
                />
              </div>
              <div className=" font-semibold text-lg mt-2">
                {session?.user?.name?.split(" ")[0]}
              </div>
            </div>
            <div className=" w-full flex-col flex justify-center items-center h-full">
              <div className="relative overflow-hidden w-1/2 aspect-square object-cover rounded-full">
                {partnerImg && (
                  <Image alt={partnerName} src={partnerImg} fill={true} />
                )}
              </div>
              <div className=" font-semibold text-lg mt-2">
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
                    onClick={() => {
                      socket.emit("stop");
                    }}
                  >
                    Skip
                  </button>
                </>
              )}
              <div className=" text-black">{queuedMsg}</div>
            </div>
          </div>
        </div>
        <Link href="/">
          <button className=" px-2 bg-gray-900 w-full text-gray-400 rounded-sm mt-3 py-1 font-semibold text-lg">
            Go to Home
          </button>
        </Link>
      </div>
    </>
  );
}
