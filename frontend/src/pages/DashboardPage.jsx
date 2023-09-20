import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const Dashboard = lazy(() => import("../components/Dashboard"));

const DashboardPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <Dashboard />
      </Suspense>
    </Layout>
  );
};

export default DashboardPage;
