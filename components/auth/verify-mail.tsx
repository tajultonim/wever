"use client";

import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/layout/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "react-otp-input";
import Cookies from "js-cookie";

let mutation = gql`
  mutation Send_verification_request {
    send_verification_request
  }
`;

let submitmutation = gql`
  mutation Submit_code($code: Int!) {
    submit_code(code: $code) {
      access_token
      refresh_token
    }
  }
`;

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [resendMail, resendres] = useMutation(mutation);
  const [submitCode, submitres] = useMutation(submitmutation);
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    if (resendres.error) {
      console.log(resendres.error);
    } else if (resendres.data) {
      alert("Code resent");
    }
    if (submitres.error) {
      setCode("");
      alert(submitres.error.message);
      console.log(submitres.error);
    } else if (submitres.data) {
      if (submitres.data.submit_code) {
        Cookies.set("access-token", submitres.data.submit_code.access_token, {
          sameSite: "strict",
          expires: new Date(new Date().getTime() + 2 * 60 * 1000),
        });
        Cookies.set("refresh-token", submitres.data.submit_code.refresh_token, {
          sameSite: "strict",
          path: "/token-refresh",
        });

        router.push(params.get("callbackUrl") || "/");
      }
    }
  }, [
    resendres.data,
    resendres.error,
    submitres.data,
    submitres.error,
    router,
    params,
  ]);
  useEffect(() => {
    if (code.length == 6) {
      submitCode({ variables: { code: parseInt(code) } });
    }
  }, [code, submitCode]);

  async function handleResend() {
    resendMail();
  }

  return (
    <div className=" text-center">
      <p className="">Verify Email</p>
      <p className=" text-xs">
        An email with an OTP has been sent to your email. Enter the OTP to
        continue.
      </p>
      <div className=" flex my-3 justify-center w-full">
        <OtpInput
          value={code}
          onChange={setCode}
          numInputs={6}
          renderSeparator={<span className="w-1"></span>}
          inputStyle="bg-[var(--c-l1)] h-10 !w-10 aspect-squar border border-[var(--c-l6)] text-[var(--c-l6)] rounded-lg "
          inputType="number"
          renderInput={(props) => (
            <input disabled={submitres.loading} {...props} />
          )}
        />
      </div>
      <p className=" text-sm"> Didn&apos;t recieve mail?</p>
      <p className=" text-xs">Check the spam folder or Resend</p>
      <button
        onClick={async () => {
          handleResend();
        }}
        disabled={resendres.loading}
        className=" text-[var(--c-l6)] border border-[var(--c-l6)] px-2 rounded-lg my-2 hover:text-white hover:bg-[var(--c-l6)]"
      >
        {resendres.loading ? <Spinner className="py-1" /> : "Resend"}
      </button>
    </div>
  );
}
