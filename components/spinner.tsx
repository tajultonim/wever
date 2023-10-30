import { FC } from "react";
import { ImSpinner2 } from "react-icons/im";

const Spinner: FC = () => {
  return (
    <div className=" p-1 w-full h-full flex justify-center">
      <ImSpinner2 className="h-6 w-6 animate-spin" />
    </div>
  );
};

export { Spinner };
