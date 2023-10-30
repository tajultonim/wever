import { useEffect, useRef, useState } from "react";
import * as mediasoup from "mediasoup-client";

export default function Livestream() {
  const btnCam = useRef<HTMLButtonElement>(null);
  const btnScreen = useRef<HTMLButtonElement>(null);
  const btnSub = useRef<HTMLButtonElement>(null);
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isWebcam, producer, device, socket, remoteStream, consumeTransport;
    const connect = () => {
      socket = new WebSocket("ws://localhost:8000/ws");
      socket.onopen = () => {
        const msg = {
          type: "getRouterRtpCapabilities",
        };
        const res = JSON.stringify(msg);
        socket.send(res);
      };

      socket.onmessage = (event) => {
        const jsonValidation = IsJsonString(event.data.toString());
        if (!jsonValidation) {
          console.error("JSON ERROR!");
          return;
        }

        let resp = JSON.parse(event.data.toString());
        switch (resp.type) {
          case "routerCapabilities":
            onRouterCapabilities(resp);
            break;
          case "producerTransportCreated":
            onProducerTransportCreated(resp);
            break;
          case "subTransportCreated":
            console.log("should not happen");
            onSubTransportCreated(resp);
            break;
          case "resume":
            console.log(event.data);
            break;
          case "subscribed":
            onSubscribed(resp);
            break;
          default:
            break;
        }
      };

      const onSubscribed = async (event) => {
        const { producerId, id, kind, rtpParameters } = event.data;
        let codecOption = {};
        const consumer = await consumeTransport.consume({
          id,
          producerId,
          kind,
          rtpParameters,
          codecOption,
        });
        const stream = new MediaStream();
        stream.addTrack(consumer.track);
        remoteStream = stream;
      };

      const onSubTransportCreated = (event) => {
        if (event.error) {
          console.error("Subtransport create error", event.error);
          return;
        }

        const transport = device.createRecvTransport(event.data);
        consumeTransport = transport;
        transport.on("connect", ({ dtlsParameters }, callback, errback) => {
          const msg = {
            type: "connectConsumerTransport",
            transportId: transport.id,
            dtlsParameters,
          };
          const message = JSON.stringify(msg);
          socket.send(message);
          socket.addEventListener("message", (event) => {
            const jsonValidation = IsJsonString(event.data.toString());
            if (!jsonValidation) {
              console.error("JSON ERROR!");
              return;
            }

            let resp = JSON.parse(event.data.toString());
            if (resp.type == "subConnected") {
              console.log("consumer transport connected!!!");
              callback();
            }
          });
        });
        transport.on("connectionstatechange", async (state) => {
          switch (state) {
            case "connecting":
              console.log("subscribing");
              break;
            case "connected":
              console.log("subscribed");
              if (remoteVideo.current) {
                let el = remoteVideo.current as HTMLVideoElement;
                console.log("remote");
                
                el.srcObject = remoteStream;
                const msg = {
                  type: "resume",
                };
                const message = JSON.stringify(msg);
                socket.send(message);
              }
              break;
            case "failed":
              transport.close();
              console.log("failed to subscribe");
              if (btnSub.current) {
                btnSub.current.disabled = false;
              }
            default:
              break;
          }
        });
        const stream = consumer(transport);
      };

      const consumer = async (transport) => {
        const { rtpCapabilities } = device;
        const msg = {
          type: "consume",
          rtpCapabilities,
        };
        const message = JSON.stringify(msg);
        socket.send(message);
      };

      const onProducerTransportCreated = async (event) => {
        if (event.error) {
          console.error("producer transport create error", event.error);
          return;
        }
        const transport = device.createSendTransport(event.data);
        transport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            const message = {
              type: "connectProducerTransport",
              dtlsParameters,
            };
            const resp = JSON.stringify(message);
            socket.send(resp);
            socket.addEventListener("message", (event) => {
              const jsonValidation = IsJsonString(event.data.toString());
              if (!jsonValidation) {
                console.error("JSON ERROR!");
                return;
              }

              let resp = JSON.parse(event.data.toString());
              if (resp.type == "producerConnected") {
                console.log("got producer Connected!!!");

                callback();
              }
            });
          }
        );

        //begin transport producer
        transport.on(
          "produce",
          async ({ kind, rtpParameters }, callback, errback) => {
            const message = {
              type: "produce",
              transportId: transport.id,
              kind,
              rtpParameters,
            };
            const resp = JSON.stringify(message);
            socket.send(resp);
            socket.addEventListener("published", (resp: any) => {
              callback(resp.data.id);
            });
          }
        );

        //end transport producer

        //connection state change begin

        transport.on("connectionstatechange", (state) => {
          switch (state) {
            case "connecting":
              console.log("connecting");
              break;
            case "connected":
              console.log("connected");
              if (localVideo.current) {
                let el = localVideo.current as HTMLVideoElement;
                el.srcObject = stream;
              }
              break;
            case "failed":
              transport.close();
              console.log("failed");
            default:
              break;
          }
        });
        //connection state change end

        let stream;
        try {
          stream = await getUserMedia(transport, isWebcam);
          const track = stream.getVideoTracks()[0];
        //  const params = { track };
          producer = await transport.produce({track});
        } catch (error) {
          console.error(error);
        }
      };

      const onRouterCapabilities = (resp) => {
        loadDevice(resp.data);
        if (btnCam.current && btnScreen.current) {
          btnCam.current.disabled = false;
          btnScreen.current.disabled = false;
        }
      };

      const IsJsonString = (str: string) => {
        try {
          JSON.parse(str);
        } catch (error) {
          return false;
        }
        return true;
      };

      const loadDevice = async (routerRtpCapabilities) => {
        try {
          device = new mediasoup.Device();
          await device.load({ routerRtpCapabilities });
        } catch (error) {
          console.log(error);

          if (error instanceof Error) {
            if (error.name == "UnsupportedEroor") {
              console.log("Browserr not supported");
            }
          }
        }
      };

      const getUserMedia = async (transport, isWebcam) => {
        if (!device.canProduce("video")) {
          console.error("can not produce video");
          return;
        }
        let stream;
        try {
          stream = isWebcam
            ? await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
              })
            : await navigator.mediaDevices.getDisplayMedia({ video: true });
        } catch (error) {
          console.error(error);
          throw error;
        }
        return stream;
      };

      btnCam.current?.addEventListener("click", publish);
      btnScreen.current?.addEventListener("click", publish);
      btnSub.current?.addEventListener("click", subscribe);

      function publish(e: Event) {
        let el = e.target as HTMLButtonElement;
        isWebcam = el.id == "btn_webcam";
        if (btnCam.current && btnScreen.current) {
          btnCam.current.disabled = true;
          btnScreen.current.disabled = true;
        }
        const message = {
          type: "createProducerTransport",
          foreTcp: false,
          rtpCapabilities: device.rtpCapabilities,
        };

        const resp = JSON.stringify(message);

        socket.send(resp);
      }

      function subscribe() {
        let el = btnSub.current as HTMLButtonElement;
        el.disabled = true;
        const msg = {
          type: "createConsumerTransport",
          forceTcp: false,
        };
        const message = JSON.stringify(msg);

        socket.send(message);
      }
    };

    connect();
  }, []);

  return (
    <>
      <div className=" w-full justify-center flex items-center">
        <div className=" w-full max-w-5xl p-4">
          <div className="w-full h-full  flex gap-2">
            <div className=" aspect-video w-1/2">
              <video ref={localVideo} className="w-full h-full" controls />
            </div>
            <div className=" aspect-video w-1/2">
              <video ref={remoteVideo} className="w-full h-full" controls />
            </div>
          </div>
          <div className=" w-full gap-2 flex">
            <button
              ref={btnCam}
              id="btn_webcam"
              disabled
              className=" bg-blue-500 rounded-md p-1 px-2"
            >
              Camera Publish
            </button>
            <button
              id="btn_screen"
              ref={btnScreen}
              disabled
              className=" bg-blue-500 rounded-md p-1 px-2"
            >
              Desktop Publish
            </button>
            <button ref={btnSub} className=" bg-red-500 rounded-md p-1 px-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
