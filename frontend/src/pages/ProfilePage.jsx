import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LazyLoader from "../components/LazyLoader";

const Profile = lazy(() => import("../components/Profile"));

const ProfilePage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <Profile />
      </Suspense>
    </Layout>
  );
};

export default ProfilePage;
