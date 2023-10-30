import { NextPage, GetServerSidePropsContext } from "next";
import { FcGoogle } from "react-icons/fc";
import { signIn, getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

const SigninPage: NextPage = (props) => {
  return (
    <>
      <div className=" flex w-full justify-center items-center">
        <div className="bg-white cursor-pointer flex flex-col gap-2 p-3 mt-28 rounded-xl shadow-sm">
          <p className=" text-center pt-2 text-[var(--c-l7)] font-bold text-2xl">
            WEVER
          </p>
          <p className=" py-2 font-semibold border-b">Signin:</p>
          <div
            onClick={() => {
              signIn("google");
            }}
            className="flex hover:text-white hover:bg-[var(--c-l6)] items-center gap-3 bg-[var(--c-l1)] py-2 px-3 rounded-lg"
          >
            <FcGoogle className="h-8 w-8" />
            Continue with Google
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: context.query["callbackUrl"]
          ? context.query["callbackUrl"]
          : "/",
      },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
