import { ChangeEventHandler, FC } from "react";
import { MdOutlineEmail } from "react-icons/md";

const EmailInput: FC<{
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}> = ({ onChange, value }) => {
  return (
    <>
      <div className=" flex border-2 bg-[var(--c-l6)] border-[var(--c-l6)] items-center rounded-lg">
        <div className=" h-8 rounded-l-md p-2 bg-[var(--c-l6)] text-white">
          <MdOutlineEmail className="ml-1 h-full aspect-square " />
        </div>
        <input
          type="email"
          value={value}
          className=" p-1 outline-none flex-1 rounded-r-md "
          onChange={onChange}
          placeholder="Enter email"
        />
      </div>
    </>
  );
};

export { EmailInput };
