import Image from "next/image";
import NotFoundCounter from "@/components/layout/not-found-counter";

export default function NotFound() {
  return (
    <>
      <div className=" p-3 w-full flex flex-col items-center">
        <div className=" relative w-[20%] max-w-[10rem] aspect-square">
          <Image
            alt="Worker Emoji"
            fill
            src={
              "https://raw.githubusercontent.com/tajultonim/Animated-Fluent-Emojis/master/Emojis/Smilies/Pensive%20Face.png"
            }
          />
        </div>
        <p className=" text-[var(--c-l7)] font-bold text-2xl">404: Not Found</p>
        <div className="py-4 text-[var(--c-l6)]">
          <p className=" text-left">The page you are looking for:</p>
          <ul className=" list-disc ml-4">
            <li>does not exist</li>
            <li>have been removed</li>
            <li>have been moved to another location</li>
          </ul>
          <NotFoundCounter />
        </div>
      </div>
    </>
  );
}
