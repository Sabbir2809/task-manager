import { Suspense, lazy } from "react";
import LazyLoader from "../components/LazyLoader";

const Registration = lazy(() => import("../components/Registration"));

const RegistrationPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Registration />
    </Suspense>
  );
};

export default RegistrationPage;
