import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const ForgetPassword = lazy(() => import("../components/ForgetPassword"));

const ForgetPasswordPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <ForgetPassword />
      </Suspense>
    </Layout>
  );
};

export default ForgetPasswordPage;
