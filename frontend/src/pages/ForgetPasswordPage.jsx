import { Suspense, lazy } from "react";
import LazyLoader from "../components/LazyLoader";

const ForgetPassword = lazy(() => import("../components/ForgetPassword"));

const ForgetPasswordPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <ForgetPassword />
    </Suspense>
  );
};

export default ForgetPasswordPage;
