import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const CanceledTask = lazy(() => import("../components/CanceledTask"));

const CanceledPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <CanceledTask />
      </Suspense>
    </Layout>
  );
};

export default CanceledPage;
