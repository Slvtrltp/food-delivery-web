"use client";
import { AuthFooter, AuthHeader } from "@/app/components/auth-layout";
import { SubmitButton, TextField } from "@/app/components/auth-form";
import { useEffect, useState } from "react";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import { useUser } from "@/app/user-provider";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OtpPage() {
  const router = useRouter();
  const { setAccessToken } = useUser();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError("Баталгаажуулах кодоо оруулна уу!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/otp", { email, otp });

      alert(res.data.message || "Амжилттай нэвтэрлэгдлээ!");
      setAccessToken(res.data.accessToken);
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Код буруу байна");
      } else {
        setError("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    setResendLoading(true);
    setError("");
    setOtp("");
    try {
      await axios.post("/api/auth", { email });
      setCountdown(60);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Дахин илгээхэд алдаа гарлаа");
      } else {
        setError("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
      }
    } finally {
      setResendLoading(false);
    }
  };
  return (
    <>
      <AuthHeader
        title="Create your account"
        subtitle="Sign up to explore your favorite dishes"
      />
      <form className=" space-y-4" onSubmit={handleSubmitForm}>
        <TextField
          id="email"
          type="email"
          placeholder="Enter your email address"
          required
          onChange={() => {}}
          value={email}
          error=""
        />
        <div className="flex gap-2">
          <InputOTP
            maxLength={4}
            value={otp}
            onChange={setOtp}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {countdown > 0 ? (
              <span className="text-gray-400">{countdown}s</span>
            ) : (
              <button
                type="button"
                disabled={resendLoading}
                onClick={handleResend}
                className="text-black font-medium underline underline-offset-2 disabled:opacity-40"
              >
                {resendLoading ? "Илгээж байна..." : "Resend"}
              </button>
            )}
          </div>
        </div>
        <SubmitButton loading={loading}>{"Let's Go"}</SubmitButton>
      </form>
      <AuthFooter linkHref="/login" linkText="log in" />
    </>
  );
}
