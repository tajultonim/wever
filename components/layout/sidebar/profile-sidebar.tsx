"use client";

import { FC } from "react";
import Image from "next/image";
import noAvaterImg from "../../../public/img/avatar.svg";
import Link from "next/link";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query Query {
    get_me {
      email
      name
      roles
      username
      image_url
    }
  }
`;

const ProfileSidebar: FC = () => {
  let user: any;
  const { data, error, loading } = useQuery(query);
  if (data) {
    user = data.get_me;
  }
  return (
    <>
      {loading ? (
        <SkeletonProfileSidebar />
      ) : (
        <div className=" shadow-sm gap-1 bg-white rounded-xl w-full flex flex-col items-center p-2  py-4">
          <div className=" relative w-1/3 aspect-square rounded-full overflow-hidden">
            <Image alt={user.name} src={user.image_url || noAvaterImg} fill />
          </div>
          <p className=" text-[var(--c-l7)] truncate">{user.name}</p>
          <p className=" text-xs truncate">{user.email}</p>
          <div className=" flex gap-2">
            <Link
              href={"/profile/edit"}
              className=" border-[var(--c-l6)] border-2 border-solid hover:border-[var(--c-l4)] hover:text-[var(--c-l4)] text-[var(--c-l6)] px-2 py-1 text-sm rounded-lg mt-2"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

function SkeletonProfileSidebar() {
  return (
    <>
      <div className=" shadow-sm gap-1 bg-white rounded-xl w-full flex flex-col items-center p-2 py-4">
        <div className=" relative w-1/3 aspect-square rounded-full overflow-hidden animate-pulse">
          <Image alt={"Loading image"} src={noAvaterImg} fill />
        </div>
        <div className="flex py-[3px] h-[24px] w-full justify-center gap-2 animate-pulse">
          <div className=" bg-[var(--c-l6)] w-[20%] rounded-xl"></div>
          <div className=" bg-[var(--c-l6)] w-[30%] rounded-xl"></div>
        </div>
        <div className="flex py-[3px] h-[16px] w-full items-center justify-center gap-2 animate-pulse">
          <div className=" bg-[var(--c-l6)] h-full w-[20%] rounded-xl"></div>
          <div className=" bg-[var(--c-l6)] h-full w-[30%] rounded-xl"></div>
          <div className=" bg-[var(--c-l6)] h-full w-[15%] rounded-xl"></div>
        </div>
        <div className=" flex gap-2 w-full justify-center animate-pulse">
          <div className=" border-[var(--c-l6)] h-[32px] w-[95px] border-2 border-solid bg-[var(--c-l6)] px-2 py-1 text-sm rounded-lg mt-2"></div>
        </div>
      </div>
    </>
  );
}

export { ProfileSidebar };
