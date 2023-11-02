import { FC } from "react";
import { IconType } from "react-icons/lib/esm/iconBase";
import Image from "next/image";
import { Blinker } from "../blinker";
import Link from "next/link";

const SidebarOption: FC<{
  Icon: IconType | string;
  slug: string;
  title: string;
  blinker?: boolean;
}> = ({ Icon, slug, title, blinker }) => {
  return (
    <>
      <Link
        href={slug}
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
      </Link>
    </>
  );
};

export { SidebarOption };
