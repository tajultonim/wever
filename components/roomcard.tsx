import { FC } from "react";
import Image from "next/image";
import { BiMicrophone } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { IoEnter } from "react-icons/io5";

const RoomCard: FC<{
  title: string;
  img: string;
  host: string;
  speakers: string[];
  participants: number;
}> = ({ title, img, host, speakers, participants }) => {
  return (
    <div className="bg-white relative hover:scale-[1.007] rounded-2xl p-5 shadow-sm">
      <button className=" hover:bg-[var(--c-l6)] hover:text-white border-2 px-2 text-[var(--c-l6)] border-[var(--c-l6)] rounded-lg flex items-center gap-1 absolute right-3 top-3">
        <div>
          <IoEnter />
        </div>
        Enter
      </button>
      <div className=" mb-2 col-span-4">
        <p className=" text-[var(--c-l6)] ">{host}</p>
        <p className=" text-[var(--c-l7)] font-semibold text-2xl sm:text-3xl truncate">
          {title}
        </p>
      </div>
      <div className=" flex gap-5 items-center">
        <div className=" flex flex-col gap-1 items-center">
          <div className="img-wrapper relative h-14 aspect-square rounded-2xl overflow-hidden">
            <Image alt="Room creator avater" src={img} fill />
          </div>
          <div className=" flex items-center gap-2 text-[var(--c-l7)]">
            <BsPeopleFill />
            <p className="text-[var(--c-l6)]">{participants}</p>
          </div>
        </div>
        <div className=" flex-1">
          {speakers.length ? (
            <p className=" text-[var(--c-l7)] font-semibold">Speakers</p>
          ) : (
            <></>
          )}
          <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-2">
            {speakers.map((speaker) => (
              <div className="flex items-center gap-1" key={speaker}>
                <div className=" text-[var(--c-l7)]">
                  <BiMicrophone />
                </div>
                <p className=" text-[var(--c-l6)] truncate">{speaker}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { RoomCard };
