import { FC } from "react";
import { BiPlus } from "react-icons/bi";

const CreateRoom: FC = () => {
  return (
    <>
      <div className="bg-gradient-to-b h-10 from-transparent flex justify-center to-[#F7EEE5] fixed bottom-0 w-full left-0">
        <div className=" cursor-pointer h-16 aspect-square -mt-8 p-1 bg-[#24B05C] rounded-full text-white">
          <BiPlus className="h-full w-full" />
        </div>
      </div>
    </>
  );
};

export { CreateRoom };
