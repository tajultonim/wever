import { FC, ReactNode, ReactDOM } from "react";
import Header from "./header";

const Layout: FC<{
  children: ReactNode;
  RightSidebar?: FC;
  LeftSidebar?: FC;
}> = ({ children, RightSidebar, LeftSidebar }) => {
  return (
    <div className="flex w-full justify-center">
      <div className="max-w-6xl w-full flex justify-center">
        <div className="grid gap-x-2 h-[100vh] w-full grid-cols-12  px-4 ">
          <header className=" py-7 pt-8 sm:py-3 sm:bg-[#F7EEE5] z-50 sm:sticky top-0 col-span-12">
            <Header />
          </header>
          <div className="left-sidebar hidden col-span-2 sm:block sm:col-span-2 md:col-span-4 lg:col-span-3 ">
            {LeftSidebar ? <LeftSidebar /> : <></>}
          </div>
          <main className="sm:scrollbar-thin sm:pr-2 col-span-12 md:col-span-8 lg:col-span-6 sm:col-span-10 scrollbar-none overflow-y-scroll overflow-x-hidden">
            {children}
          </main>
          <div className="right-sidebar  hidden lg:block lg:col-span-3">
            {RightSidebar ? <RightSidebar /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Layout };
