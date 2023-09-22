import { Suspense, lazy } from "react";
import LazyLoader from "../../components/LazyLoader";

const VerifyOTP = lazy(() => import("../../components/PasswordRecover/VerifyOTP"));

const VerifyOTPPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <VerifyOTP />
    </Suspense>
  );
};
export default VerifyOTPPage;
