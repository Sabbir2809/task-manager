import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const NotFound = lazy(() => import("../components/NotFound"));

const NotFoundPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <NotFound />
      </Suspense>
    </Layout>
  );
};

export default NotFoundPage;
