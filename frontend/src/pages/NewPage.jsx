import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const NewTask = lazy(() => import("../components/NewTask"));

const NewPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <NewTask />
      </Suspense>
    </Layout>
  );
};

export default NewPage;
