import { FC, ReactNode } from "react";

const Blinker: FC<{
  children: ReactNode;
  active: boolean;
  className?: string;
}> = ({ children, active, className }) => {
  return (
    <div
      className={` relative flex aspect-square text-[var(--c-l7)] ${className}`}
    >
      <span
        className={` z-10 absolute right-0 top-0 flex h-3 w-3 ${
          !active ? "hidden" : ""
        }`}
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--c-l7)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--c-l7)] "></span>
      </span>
      {children}
    </div>
  );
};

export { Blinker };
