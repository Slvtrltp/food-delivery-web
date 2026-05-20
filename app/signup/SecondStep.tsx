import React, { useState } from "react";
import { TextField } from "../components/TextField";
interface FirstStepProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}
export const SecondStep = ({
  handleNextStep,
  handlePrevStep,
}: FirstStepProps) => {
  return (
    <div className=" container ">
      <div className=" flex items-center mt-20 gap-10">
        <div className="w-104 space-y-6">
          <button
            type="button"
            onClick={handlePrevStep}
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
          </button>
          <ul>
            <h1 className="text-[24px] font-semibold">
              Create a strong password
            </h1>
            <p className="text-[16px] text-[#71717A] font-normal">
              Create a strong password with letters, numbers.
            </p>
          </ul>
          <div className="space-y-4">
            <TextField placeholder="Password" type="password" />
            <TextField placeholder="Confirm" type="password" />
            <ul className="flex items-center gap-1">
              <input
                type="checkbox"
                className="outline-0 border border-[#848485] opacity-50"
              ></input>
              <p className="text-[#848485] text-[14px] ">Show password</p>
            </ul>
          </div>
          <button
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
