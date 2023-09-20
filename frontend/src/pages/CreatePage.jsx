import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const CreateTask = lazy(() => import("../components/CreateTask"));

const CreatePage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <CreateTask />
      </Suspense>
    </Layout>
  );
};

export default CreatePage;
