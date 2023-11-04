import { ChangeEventHandler, FC, KeyboardEventHandler } from "react";
import { IconType } from "react-icons/lib";

const Input: FC<{
  onChange: ChangeEventHandler<HTMLInputElement>;
  Icon: IconType;
  type: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
}> = ({ onChange, Icon, type, placeholder, value, onKeyUp, disabled }) => {
  return (
    <>
      <div className=" flex border-2 bg-[var(--c-l6)] border-[var(--c-l6)] items-center rounded-lg">
        <div className=" h-8 rounded-l-md p-2 bg-[var(--c-l6)] text-white">
          <Icon className="ml-1 h-full aspect-square " />
        </div>
        <input
          type={type}
          onKeyUp={onKeyUp}
          className=" p-1 outline-none flex-1 rounded-r-md "
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export { Input };
