import { FC } from "react";
import { LuSearch } from "react-icons/lu";

const Search: FC = () => {
  return (
    <>
      <div className="h-full p-[10px] aspect-square">
        <LuSearch className="h-full text-[var(--c-l4)] w-full" />
      </div>
      <input
        placeholder="Search..."
        className="flex-1 h-full outline-none pr-3"
        type="search"
      />
    </>
  );
};

export { Search };
