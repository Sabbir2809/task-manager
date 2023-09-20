import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const Login = lazy(() => import("../components/Login"));

const LoginPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <Login />
      </Suspense>
    </Layout>
  );
};

export default LoginPage;
