import { useSession, signIn } from "next-auth/react";
import LoginButton from "../components/buttons/login";

export default function Home() {
  return (
    <>
      <header className=" w-full border-b py-3">
        <h1 className=" text-4xl font-medium ">HiGuys</h1>
      </header>
      <main className=" w-full flex justify-center items-center py-2 ">
        <button className=" p-1 bg-white text-black rounded">Instamatch</button>
        {/* <LoginButton /> */}
      </main>
    </>
  );
}
