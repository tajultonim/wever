import { Metadata, NextPage } from "next";
import { decode } from "@/helper/jwt/crypto";
import VerifyEmail from "@/components/auth/verify-mail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    if (!payload?.context?.roles.includes("email_verified")) {
      redirect(cburl ? cburl : "/");
    }
  }
}

export const metadata: Metadata = {
  title: "Verify Email — WEVER",
};

const VerifyMailPage: NextPage<Props> = async (props) => {
  await validateJWT(props.searchParams.callbackUrl);
  return <VerifyEmail />;
};

export default VerifyMailPage;
