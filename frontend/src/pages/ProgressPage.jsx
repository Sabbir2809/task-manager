import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const ProgressTask = lazy(() => import("../components/ProgressTask"));

const ProgressPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <ProgressTask />
      </Suspense>
    </Layout>
  );
};

export default ProgressPage;
