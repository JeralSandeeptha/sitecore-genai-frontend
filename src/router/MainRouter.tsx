import ProtectedRoute from '@/components/protected-route/ProtectedRoute';
import PublicRoute from '@/components/public-route/PublicRoute';
import ChatPage from '@/pages/chat-page/ChatPage';
import ComponentGeneratorPage from '@/pages/component-generator-page/ComponentGeneratorPage';
import DocsPage from '@/pages/docs-page/DocumentationPage';
import { ForgotPasswordPage } from '@/pages/forgot-password-page/ForgotPasswordPage';
import LandingPage from '@/pages/landing-page/LandingPage';
import LoginPage from '@/pages/login-page/LoginPage';
import ProfilePage from '@/pages/profile-page/ProfilePage';
import RegisterPage from '@/pages/register-page/RegisterPage';
import { Route, Routes } from 'react-router-dom';

const MainRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
      <Route
        path="/docs"
        element={
          <PublicRoute>
            <DocsPage />
          </PublicRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
      />
      {/* <Route
        path="/component-generator"
        element={
          <ProtectedRoute>
            <ComponentGeneratorPage />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default MainRouter;
