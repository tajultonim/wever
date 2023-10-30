import { FC } from "react";
import { IconType } from "react-icons/lib/esm/iconBase";
import Image from "next/image";
import { Blinker } from "./blinker";

const SidebarOption: FC<{
  Icon: IconType | string;
  onClick: () => void;
  title: string;
  blinker?: boolean;
}> = ({ Icon, onClick, title, blinker }) => {
  return (
    <>
      <div
        onClick={() => {
          onClick();
        }}
        className=" group bg-[var(--c-l1)] rounded-xl hover:text-[var(--c-l4)] last:border-b-0 flex text-[var(--c-l6)] items-center m-2  cursor-pointer gap-2"
      >
        <Blinker active={!!blinker}>
          <div
            className={` w-12  relative overflow-hidden h-12 rounded-2xl p-3 group-hover:bg-[var(--c-l4)] bg-[var(--c-l6)] ${
              typeof Icon == "string"
                ? "border-[3px] group-hover:border-[var(--c-l4)] border-[var(--c-l6)]"
                : ""
            }`}
          >
            {typeof Icon == "string" ? (
              <Image alt="Profile Image" fill src={Icon} />
            ) : (
              <Icon className=" text-white h-full w-full" />
            )}
          </div>
        </Blinker>
        <p className="hidden md:block pr-3">{title}</p>
      </div>
    </>
  );
};

export { SidebarOption };
