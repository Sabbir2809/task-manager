import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FullScreenLoader from "./components/FullScreenLoader";
import { getToken } from "./helpers/SessionHelper";
import CanceledPage from "./pages/CanceledPage";
import CompletedPage from "./pages/CompletedPage";
import CreatePage from "./pages/CreatePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NewPage from "./pages/NewPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreatePasswordPage from "./pages/PasswordRecoverPage/CreatePasswordPage";
import SendOTPPage from "./pages/PasswordRecoverPage/SendOTPPage";
import VerifyOTPPage from "./pages/PasswordRecoverPage/VerifyOTPPage";
import ProfilePage from "./pages/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import RegistrationPage from "./pages/RegistrationPage";

const App = () => {
  if (getToken()) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/create-task" element={<CreatePage />} />
          <Route path="/new-task" element={<NewPage />} />
          <Route path="/progress-task" element={<ProgressPage />} />
          <Route path="/completed-task" element={<CompletedPage />} />
          <Route path="/canceled-task" element={<CanceledPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <FullScreenLoader />
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />

          <Route path="/send-otp" element={<SendOTPPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/create-password" element={<CreatePasswordPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <FullScreenLoader />
      </BrowserRouter>
    );
  }
};

export default App;
