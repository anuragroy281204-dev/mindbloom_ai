import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Disclaimer from "./pages/Disclaimer";
import UserInfo from "./pages/UserInfo";
import ChatPage from "./pages/ChatPage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />


        <Route path="/report" element={<ReportPage />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/report" element={<ReportPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;