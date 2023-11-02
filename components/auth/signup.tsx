"use client";

import { FC } from "react";
import { useState } from "react";
import { EmailInput } from "../inputs/email";
import { Input } from "../inputs/universal-input";
import { BiRename } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { emailReg, nameReg, passwordReg, usernameReg } from "../../helper/regs";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPassword } from "react-icons/md";

const SignUp: FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  return (
    <>
      <Input
        onChange={(e) => {
          let el = e.target as HTMLInputElement;
          el.setCustomValidity("");
          let reg = /[^a-zA-Z ]/;
          if (reg.test(el.value)) {
            el.setCustomValidity("Please enter alphabets only");
            el.reportValidity();
          }

          if (el.value.length > 35) {
            el.setCustomValidity("Maximum 35 charecter is allowed");
            el.reportValidity();
            return;
          }

          setName(
            e.target.value.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, " ")
          );
        }}
        value={name}
        Icon={FaUser}
        placeholder="Enter name"
        type="text"
      />
      <Input
        onChange={(e) => {
          e.target.setCustomValidity("");
          let reg = /[^a-zA-Z0-9._]/;
          if (reg.test(e.target.value)) {
            e.target.setCustomValidity(
              "only dot underscore and alphanumeric characters are allowed"
            );
            e.target.reportValidity();
          }
          if (e.target.value.length > 15) {
            e.target.setCustomValidity("Maximum 15 charecters allowed");
            e.target.reportValidity();
            return;
          }
          let str = e.target.value
            .replace(/[^a-zA-Z0-9._]/g, "")
            .replace(/\.{2,}/g, ".")
            .replace(/_+/g, "_")
            .trim();
          setUsername(str);
        }}
        value={username}
        Icon={BiRename}
        placeholder="Enter username"
        type="text"
      />
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
      <Input
        onChange={(e) => {
          let reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          e.target.setCustomValidity("");
          if (!reg.test(e.target.value)) {
            e.target.setCustomValidity(
              "Password must be minimum 8 letter long with at least one symbol,upper and lowercase charecter and number"
            );
            e.target.reportValidity();
          }
          setPassword(e.target.value);
        }}
        Icon={RiLockPasswordLine}
        placeholder="Enter password"
        type="password"
      />
      <Input
        onChange={(e) => {
          e.target.setCustomValidity("");
          if (e.target.value !== password) {
            e.target.setCustomValidity("Passwords doesn't match!");
            e.target.reportValidity();
          }

          setConPassword(e.target.value);
        }}
        Icon={MdPassword}
        placeholder="Confirm password"
        type="password"
      />
      <div className=" flex justify-center">
        <button
          disabled={
            !nameReg.test(name) ||
            !usernameReg.test(username) ||
            !emailReg.test(email) ||
            !passwordReg.test(password) ||
            password != conPassword
          }
          className=" disabled:opacity-80 text-white  w-full py-1 bg-[var(--c-l6)] rounded-lg"
        >
          Signup
        </button>
      </div>
    </>
  );
};

export { SignUp };
