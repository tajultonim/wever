import { FC } from "react";
import Image from "next/image";
import WorkerImage from "../../public/img/worker.png";
import Link from "next/link";

const UnderConstruction: FC = () => {
  return (
    <div className=" w-full flex flex-col items-center">
      <Image
        className="w-[40%] max-w-sm aspect-square"
        alt="Worker Emoji"
        src={WorkerImage}
      />
      <p className="-mt-3 text-[var(--c-l7)] font-bold text-2xl">
        UNDER CONSTRUCTION
      </p>
      <p className=" text-[var(--c-l6)] text-lg ">
        Please return to{" "}
        <Link href="/" className=" underline cursor-pointer">
          home
        </Link>
      </p>
    </div>
  );
};

export { UnderConstruction };
