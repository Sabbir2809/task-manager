import { Suspense, lazy } from "react";
import LazyLoader from "../../components/LazyLoader";

const SendOTP = lazy(() => import("../../components/PasswordRecover/SendOTP"));

const SendOTPPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <SendOTP />
    </Suspense>
  );
};
export default SendOTPPage;
