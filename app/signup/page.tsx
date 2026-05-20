"use client";
import { useState } from "react";

import { Firststep } from "./Firststep";
import { SecondStep } from "./SecondStep";

export default function Home({}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const steps = [Firststep, SecondStep];
  const StepForm = steps[step];

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep((step) => step + 1);
    } else return;
  };
  const handlePrevStep = () => {
    if (step > 0) {
      setStep((step) => step - 1);
    } else return;
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#f4f4f4]">
      <StepForm
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
      />
    </div>
  );
}
