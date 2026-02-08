import ChatPage from "@/pages/chat-page/ChatPage";
import ComponentGeneratorPage from "@/pages/component-generator-page/ComponentGeneratorPage";
import DocsPage from "@/pages/docs-page/DocumentationPage";
import { ForgotPasswordPage } from "@/pages/forgot-password-page/ForgotPasswordPage";
import LandingPage from "@/pages/landing-page/LandingPage";
import LoginPage from "@/pages/login-page/LoginPage";
import ProfilePage from "@/pages/profile-page/ProfilePage";
import RegisterPage from "@/pages/register-page/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/component-generator" element={<ComponentGeneratorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter;
