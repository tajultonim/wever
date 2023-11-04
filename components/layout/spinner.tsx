import { FC } from "react";
import { ImSpinner2 } from "react-icons/im";

const Spinner: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-full flex justify-center ${className ? className : ""}`}>
      <ImSpinner2 className=" animate-spin" />
    </div>
  );
};

export { Spinner };
