"use client";
import React, { useState } from "react";
import { TextField } from "../components/TextField";
import Link from "next/link";
interface FirstStepProps {
  handleNextStep: () => void;
}
export const Firststep = ({ handleNextStep }: FirstStepProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const isEmailVallid = (email: string) => {
    if (email === "") return "И-мэйлээ оруулна уу!";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      return "И-мэйл буруу форматтай байна.";
    return "";
  };
  return (
    <div className=" container ">
      <div className=" flex items-center gap-10">
        <div className="w-104 space-y-6">
          <Link
            href="/"
            className="w-9 h-[36px] border border-[#E4E4E7] rounded-md flex justify-center items-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <ul>
            <h1 className="text-[26px] font-semibold">Create your account</h1>
            <p className="text-[18px] text-[#71717A] font">
              Sign up to explore your favorite dishes.
            </p>
          </ul>
          <TextField
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setEmailError(isEmailVallid(e.target.value));
            }}
            placeholder="Enter your email address"
            type="email"
            error={emailError}
          />
          <button
            onClick={handleNextStep}
            type="button"
            className="w-full rounded-md  bg-[#50c878] h-[36px] text-white"
          >
            Let&apos;s Go
          </button>
          <p className="text-[#71717A] text-[16px] text-center">
            Already have an account?{" "}
            <span className="text-[#50c878]">Log in</span>
          </p>
        </div>
        <div className="">
          <img src="/image.png" alt="poster" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};
