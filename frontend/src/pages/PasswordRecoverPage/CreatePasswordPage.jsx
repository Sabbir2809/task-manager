import { Suspense, lazy } from "react";
import LazyLoader from "../../components/LazyLoader";

const CreatePassword = lazy(() => import("../../components/PasswordRecover/CreatePassword"));

const CreatePasswordPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <CreatePassword />
    </Suspense>
  );
};
export default CreatePasswordPage;
