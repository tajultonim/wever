import { ChangeEventHandler, FC, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";

const PasswordInput: FC<{
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ onChange }) => {
  const [hide, setHide] = useState(true);
  return (
    <>
       <div className=" flex border-2 bg-[var(--c-l6)] border-[var(--c-l6)] items-center rounded-lg">
        <div className=" h-8 rounded-l-md p-2 bg-[var(--c-l6)] text-white">
          <RiLockPasswordLine className="ml-1 h-full aspect-square " />
        </div>
        <input
          type={hide ? "password" : "text"}
          className=" p-1 pr-0 outline-none flex-1 "
          onChange={onChange}
          placeholder="Enter password"
        />
        <div
          className=" h-8 aspect-square p-2 bg-white rounded-r-md"
          onClick={() => {
            setHide((prev) => !prev);
          }}
        >
          {hide ? (
            <BiShow className="h-full w-full " />
          ) : (
            <BiHide className="h-full w-full " />
          )}
        </div>
      </div>
    </>
  );
};

export { PasswordInput };
