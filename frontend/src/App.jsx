import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FullScreenLoader from "./components/FullScreenLoader";
import LazyLoader from "./components/LazyLoader";
import NotFound from "./components/NotFound";
import { getToken } from "./helpers/SessionHelper";
import MainLayout from "./layout/MainLayout";

const Login = lazy(() => import("./pages/Registration/Login"));
const Signup = lazy(() => import("./pages/Registration/Signup"));
const SendOTP = lazy(() => import("./pages/Registration/PasswordRecover/SendOTP"));
const VerifyOTP = lazy(() => import("./pages/Registration/PasswordRecover/VerifyOTP"));
const CreatePassword = lazy(() => import("./pages/Registration/PasswordRecover/CreatePassword"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const CreateTask = lazy(() => import("./pages/Task/CreateTask"));
const ProgressTask = lazy(() => import("./pages/Task/ProgressTask"));
const CompletedTask = lazy(() => import("./pages/Task/CompletedTask"));
const CanceledTask = lazy(() => import("./pages/Task/CanceledTask"));
const NewTask = lazy(() => import("./pages/Task/NewTask"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const App = () => {
  if (getToken()) {
    return (
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/create-task"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <CreateTask />
                </Suspense>
              }
            />
            <Route
              path="/new-task"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <NewTask />
                </Suspense>
              }
            />
            <Route
              path="/progress-task"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <ProgressTask />
                </Suspense>
              }
            />
            <Route
              path="/completed-task"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <CompletedTask />
                </Suspense>
              }
            />
            <Route
              path="/canceled-task"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <CanceledTask />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
        <FullScreenLoader />
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LazyLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/registration"
            element={
              <Suspense fallback={<LazyLoader />}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/send-otp"
            element={
              <Suspense fallback={<LazyLoader />}>
                <SendOTP />
              </Suspense>
            }
          />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route
            path="/create-password"
            element={
              <Suspense fallback={<LazyLoader />}>
                <CreatePassword />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FullScreenLoader />
      </BrowserRouter>
    );
  }
};

export default App;
