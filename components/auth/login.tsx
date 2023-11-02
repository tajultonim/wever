"use client";

import { FC } from "react";
import { useState } from "react";
import { EmailInput } from "@/components/inputs/email";
import { PasswordInput } from "@/components/inputs/password";
import { nameReg, usernameReg, emailReg, passwordReg } from "../../helper/regs";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          disabled={!emailReg.test(email) || !passwordReg.test(password)}
          className=" disabled:opacity-80 text-white  w-full py-1 bg-[var(--c-l6)] rounded-lg"
        >
          Login
        </button>
      </div>
    </>
  );
};

export { Login };
