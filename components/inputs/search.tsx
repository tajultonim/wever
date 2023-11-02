"use client";
import { FC } from "react";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";

const Search: FC = () => {
  const router = useRouter();
  return (
    <>
      <div className=" bg-white items-center w-full flex h-10 rounded-3xl shadow-sm overflow-hidden">
        <div className="h-full p-[10px] aspect-square">
          <LuSearch className="h-full text-[var(--c-l4)] w-full" />
        </div>
        <input
          placeholder="Search..."
          className="flex-1 h-full outline-none pr-3"
          type="search"
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              let el = e.target as HTMLInputElement;
              router.push(`/search?query=${el.value}`);
            }
          }}
        />
      </div>
    </>
  );
};

export { Search };
