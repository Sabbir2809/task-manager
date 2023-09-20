import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const Registration = lazy(() => import("../components/Registration"));

const RegistrationPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <Registration />
      </Suspense>
    </Layout>
  );
};

export default RegistrationPage;
