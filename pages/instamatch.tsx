import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { parseCookies } from "nookies";
import Link from "next/link";
import Head from "next/head";
import noAvatarImg from "../public/img/avatar.svg";
import Header from "@/components/header";
import { useRouter } from "next/router";

let socket: Socket = io("", { autoConnect: false });
let pc: RTCPeerConnection;
let offerDescription: RTCSessionDescription;

export default function Instamatch() {
  const { data: session } = useSession();
  const router = useRouter();
  const [onlineCount, setOnlineCount] = useState(0);
  const [queuedMsg, setQueuedMsg] = useState("Connecting...");
  const [partnerName, setPartnerName] = useState("");
  const [partnerImg, setPartnerImg] = useState("/img/avatar.svg");
  const [isMatched, setIsMatched] = useState(false);
  const [gotOffer, setGotOffer] = useState(false);
  const audioEl = useRef<HTMLAudioElement>(null);
  const [inCall, setInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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
      setPartnerImg("/img/avatar.svg");
      setIsMatched(false);
      resetRTC();
      socket.emit("start", socket.id);
    });

    socket.on("ydisconnected", () => {
      setPartnerName("");
      setPartnerImg("/img/avatar.svg");
      setIsMatched(false);
      resetRTC();
      socket.emit("start", socket.id);
    });

    async function initRTC() {
      const servers: RTCConfiguration = {
        iceServers: [
          // {
          //   urls: "stun:a.relay.metered.ca:80",
          // },
          {
            urls: "stun:stun.l.google.com:19302",
          },
          {
            urls: "turn:a.relay.metered.ca:80",
            username: "0619f03d44b0248dde925ecb",
            credential: "eUEcqD8d1ci4y2fK",
          },
          {
            urls: "turn:a.relay.metered.ca:80?transport=tcp",
            username: "0619f03d44b0248dde925ecb",
            credential: "eUEcqD8d1ci4y2fK",
          },
          {
            urls: "turn:a.relay.metered.ca:443",
            username: "0619f03d44b0248dde925ecb",
            credential: "eUEcqD8d1ci4y2fK",
          },
          {
            urls: "turn:a.relay.metered.ca:443?transport=tcp",
            username: "0619f03d44b0248dde925ecb",
            credential: "eUEcqD8d1ci4y2fK",
          },
        ],
        iceTransportPolicy: "relay",
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

      pc.addEventListener("icecandidateerror", (e) => {
        let ev: RTCPeerConnectionIceErrorEvent = e as any;
        let state = pc.iceConnectionState;
        switch (state) {
          case "checking":
            console.log("ice checking", ev.url);
          case "completed":
            console.log("ice completed", ev.url);
          case "disconnected":
            console.log("ice disconnected", ev.url);
          case "closed":
            console.log("ice closed", ev.url);
          case "connected":
            console.log("ice connected", ev.url);
          case "failed":
            console.log("ice failed", ev.url);
            pc.restartIce();
          case "new":
            console.log("ice new", ev.url);
        }
      });

      pc.addEventListener("connectionstatechange", (ev) => {
        let state = pc.connectionState;
        switch (state) {
          case "closed":
            console.log("connection closed");
          case "failed":
            console.log("connection failed");
          case "disconnected":
            console.log("connection disconnected");
          case "connected":
            console.log("connection eshtablished");
            setQueuedMsg("In call...");
        }
      });

      socket.on("offered", (data) => {
        console.log("Got offer");

        setGotOffer(true);
        goffer = true;
        offerDescription = data;
      });

      socket.on("answered", async (data) => {
        console.log("Got answer");

        setQueuedMsg("Call connecting...");
        let answerDescription = new RTCSessionDescription(data);
        if (!pc.currentRemoteDescription && answerDescription) {
          console.log("set remote desc");
          await pc.setRemoteDescription(answerDescription);
        }
      });

      socket.on("answercandidate", (data) => {
        console.log("Got Answer candidata");

        let candidate = new RTCIceCandidate(data);
        pc.addIceCandidate(candidate);
      });
    }

    async function resetRTC() {
      window.location.reload();
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
        console.log("ICE Candidate ", ev.candidate);
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
    let audioSender = pc
      .getSenders()
      .find((sender) => sender.track?.kind == "audio");
    if (audioSender) {
      let audioParams = audioSender.getParameters();
      audioParams.encodings[0].maxBitrate = 32000;
      await audioSender.setParameters(audioParams);
    }
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

      let answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };
      socket.emit("ianswer", answer);
      setQueuedMsg("Call connecting");
    }
  }

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
                        onClick={() => {
                          socket.emit("stop");
                        }}
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
