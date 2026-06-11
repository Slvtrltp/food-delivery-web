import { Suspense } from "react";
import OtpPage from "./OtpPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OtpPage />
    </Suspense>
  );
}
