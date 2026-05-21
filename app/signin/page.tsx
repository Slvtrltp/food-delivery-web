"use client";
import { useState } from "react";

import { Firststep } from "./Firststep";

export type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type StepProps = {
  handlePrevStep?: () => void;
  handleNextStep?: () => void;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  setError: React.Dispatch<React.SetStateAction<FormState>>;
  error: FormState;
};

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

  const steps = [Firststep];
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
        form={form}
        setForm={setForm}
        error={error}
        setError={setError}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
      />
    </div>
  );
}
