import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const CompletedTask = lazy(() => import("../components/CompletedTask"));

const CompletedPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <CompletedTask />
      </Suspense>
    </Layout>
  );
};

export default CompletedPage;
