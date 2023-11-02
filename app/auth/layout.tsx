import { NextPage } from "next";
import { ReactNode } from "react";

const AuthLayout: NextPage<{ children: ReactNode }> = async ({ children }) => {
  return (
    <>
      <div className=" flex w-full justify-center items-end h-[100vh] sm:h-auto sm:items-center">
        <div className="mx-2 bg-white w-full max-w-xs cursor-pointer space-y-2 p-3 mt-28 rounded-xl shadow-sm pb-10 sm:pb-3">
          <p className=" text-center pt-2 text-[var(--c-l7)] font-bold text-2xl">
            WEVER
          </p>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
