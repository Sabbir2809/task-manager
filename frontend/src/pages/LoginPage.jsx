import { Suspense, lazy } from "react";
import LazyLoader from "../components/LazyLoader";

const Login = lazy(() => import("../components/Login"));

const LoginPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
