"use client";

import { FC, useEffect } from "react";
import { useState } from "react";
import { EmailInput } from "@/components/inputs/email";
import { PasswordInput } from "@/components/inputs/password";
import { emailReg, passwordReg } from "../../helper/regs";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { Spinner } from "../layout/spinner";

let mutation = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doMutate, { data, loading, error }] = useMutation(mutation);
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    if (data) {
      Cookies.set("access-token", data.login.access_token, {
        sameSite: "strict",
        expires: new Date(new Date().getTime() + 2 * 60 * 1000),
      });
      Cookies.set("refresh-token", data.login.refresh_token, {
        sameSite: "strict",
        path: "/token-refresh",
      });
      router.replace(search.get("callbackUrl") || "/");
    }
    if (error) {
      alert(error.message);
    }
  });

  function handleLogin(email: string, password: string) {
    doMutate({ variables: { email, password } });
  }
  return (
    <>
      <EmailInput
        onChange={(e) => {
          e.target.setCustomValidity("");
          let reg = /[^a-zA-Z0-9.@]/;
          if (reg.test(e.target.value)) {
            e.target.setCustomValidity("Please enter a valid email");
            e.target.reportValidity();
            return;
          }
          setEmail(
            e.target.value
              .toLowerCase()
              .replace(/\.{2,}/g, ".")
              .replace(/@+/g, "@")
          );
        }}
        value={email}
      />
      <PasswordInput
        onChange={(e) => {
          e.target.setCustomValidity("");
          if (!passwordReg.test(e.target.value)) {
            e.target.setCustomValidity(
              "Password must be minimum 8 letter long with at least one symbol,upper and lowercase charecter and number"
            );
            e.target.reportValidity();
          }
          setPassword(e.target.value);
        }}
      />
      <div className=" flex justify-center">
        <button
          disabled={
            !emailReg.test(email) || !passwordReg.test(password) || loading
          }
          onClick={async () => {
            handleLogin(email, password);
          }}
          className=" disabled:opacity-80 text-white  w-full py-1 bg-[var(--c-l6)] rounded-lg"
        >
          {loading ? <Spinner className="py-1" /> : "Login"}
        </button>
      </div>
    </>
  );
};

export { Login };
