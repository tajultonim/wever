import { NextPage, Metadata } from "next";
import { decode } from "@/helper/jwt/crypto";
import { SignUp } from "@/components/auth/signup";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  params: {};
  searchParams: {
    callbackUrl?: string;
  };
}

async function validateJWT(cburl: string | undefined) {
  const jwt = cookies().get("access-token")?.value;
  const payload = await decode(jwt);
  if (payload) {
    redirect(cburl ? cburl : "/");
  }
}

export const metadata: Metadata = {
  title: "Signup — WEVER",
};

const SignupPage: NextPage<Props> = async (props) => {
  await validateJWT(props.searchParams.callbackUrl);
  return (
    <>
      <div className="flex">
        <Link
          href={{
            pathname: "/auth/login",
            query: { callbackUrl: props.searchParams.callbackUrl },
          }}
          replace
          className="w-1/2 py-2 text-[var(--c-l6)] font-semibold border-b-2 text-center"
        >
          Login
        </Link>
        <button className=" cursor-default border-[var(--c-l6)] w-1/2 py-2 text-[var(--c-l6)] font-semibold border-b-2 text-center">
          Signup
        </button>
      </div>
      <div className=" space-y-3 pt-1">
        <SignUp />
      </div>
    </>
  );
};

export default SignupPage;
